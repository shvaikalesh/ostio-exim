import React from 'react';
import postsStore from 'stores/posts';
import Spinner from 'components/common/Spinner';
import Animated from 'components/common/Animated';
import PostCard from 'components/PostCard';

export default React.createClass({
  mixins: [postsStore.connect('postsLoading', 'posts')],

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const query = e.target.value;
      this.setState({query});
      postsStore.actions.search(query);
    }
  },

  getInitialState() { return {}; },

  render() {
    if (this.state.query) {
      let posts;

      if (this.state.postsLoading) {
        posts = <Spinner />;
      } else if (this.state.posts.length) {
        posts = this.state.posts.map(post =>
          <Animated key={post.id}>
            <PostCard post={post} inFeed={true} />
          </Animated>
        );
      } else {
        posts = 'No posts found.';
      }

      var searchResults = <div className="post-list-container">
        <h4>Posts matching query <q>{this.state.query}</q>:</h4>
        <div className="topic-posts">
          <div className="posts">{posts}</div>
        </div>
      </div>;
    }

    return (
      <div>
        <div className="search-banner">
          <h2>Post search</h2>
          <input className="search-input" type="search" onKeyPress={this.handleKeyPress} />
        </div>
        {searchResults}
      </div>
    );
  }
});
