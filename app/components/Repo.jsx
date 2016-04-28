import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import Spinner from 'components/common/Spinner';
import Animated from 'components/common/Animated';
import topicsStore from 'stores/topics';

const TopicCard = ({ topic }) => {
  const url = "/@" + topic.repo.user.login + "/" + topic.repo.name + "/topics/" + topic.number;
  const createdAt = new Date(topic.created_at);

  return <div className="repo-topic">
    <div className="repo-topic-header">
      <Link to={url}>#{topic.number}</Link> <Link to={url}>{topic.title}</Link>
    </div>
    by <Link className="post-author" to={"/@" + topic.user.login}>{topic.user.login}</Link>
    <time dateTime={createdAt.toISOString()}>{moment(createdAt).fromNow()}</time>
    <span className="post-metadata post-date">{topic.total_posts} posts</span>
  </div>
};

export default React.createClass({
  mixins: [
    topicsStore.connect('topicsLoading', 'topics')
  ],

  componentDidMount() {
    topicsStore.actions.fetchForUserRepo(this.props.params.login, this.props.params.repo);
  },

  getInitialState() { return {}; },

  render() {
    const {topics} = this.state;
    if (!topics) return <Spinner />;

    let tops;

    if (this.state.topicsLoading) {
      tops = <Spinner />;
    } else if (topics.length) {
      tops = topics.map(topic => <Animated key={topic.id}><TopicCard topic={topic} /></Animated>);
    } else {
      tops = 'No topics.';
    }

    const {params} = this.props;
    const ghUrl = `https://github.com/${params.login}/${params.repo}`;

    return <div className="repo-topic-list-container">
      <h4>
        Topics <a className="icon icon-github" href={ghUrl} />
      </h4>

      <div>{tops}</div>
    </div>;
  }
});
