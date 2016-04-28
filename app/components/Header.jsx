import React from 'react';
import { Link } from 'react-router';
import { api } from 'config';
import usersStore from 'stores/users';
import Avatar from 'components/common/Avatar';

const HeaderAuth = React.createClass({
  mixins: [
    usersStore.connect('currentUser')
  ],

  getInitialState() { return {}; },

  logout(e) {
    e.preventDefault();
    usersStore.actions.logout();
  },

  render() {
    const {currentUser} = this.state;

    if (currentUser) {
      const profilePath = '/@' + currentUser.login;

      return <div className="header-auth">
        <Link to={profilePath}><Avatar className="header-avatar" url={currentUser.avatar_url} /></Link>
        <Link to={profilePath} className="header-login">{currentUser.login}</Link>
        <Link to="/settings" className="icon icon-cog" />
        <a href="#" className="icon icon-logout" onClick={this.logout} />
      </div>;
    } else {
      const loginUrl = api.root + '/auth';

      return <div className="header-auth">
        <a href={loginUrl} className="header-login-button button">
          Login<span className="header-login-provider"> with GitHub</span>
        </a>
      </div>;
    }
  }
});

export default () => {
  return (
    <div className="header-container">
      <header className="header">
        <h1 className="header-logo">
          <Link to="/">Ost.io</Link>
        </h1>

        <nav className="header-nav">
          <Link to="/feed">Feed</Link>
          <Link to="/search">Search</Link>
        </nav>

        <HeaderAuth />
      </header>
    </div>
  );
};
