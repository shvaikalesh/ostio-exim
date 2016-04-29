import React from 'react';
import usersStore from 'stores/users';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  mixins: [
    usersStore.connect('currentUser')
  ],

  componentDidMount() {
    const {query} = this.props.location;
    const {access_token, login} = query;
    const {router} = this.context;
    usersStore.actions.login(access_token).then(() => {
      router.push('/@' + login);
    });
  },

  render() {
    return <div>Logging in...</div>;
  }
});
