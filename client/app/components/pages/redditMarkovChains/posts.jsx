import React, { PropTypes } from 'react';
import Post from './post';

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  })),
  loadingStatus: PropTypes.string.isRequired,
  subreddit: PropTypes.string.isRequired,
};

const Loading = ({loadingStatus, subreddit}) => {
  return (
    <h3 className="text-center">
    {loadingStatus === 'FAILED'
      ? 'Loading Failed. Please try a different subreddit'
      : <span><i className="fa fa-spinner fa-spin fa-lg" /> loading /r/{subreddit}...</span>}
    </h3>
  );
};

const Posts = ({ posts, loadingStatus, subreddit}) => {
  return (
    <div>
      {loadingStatus === 'IDLE'
        ? posts.map((post, i) => (
            <Post
              key={i}
              rank={i + 1}
              score={post.score}
              title={post.title}
              url={post.url}
              />
          ))
        : <Loading loadingStatus={loadingStatus} subreddit={subreddit} />
      }
    </div>
  );
};

Posts.propTypes = propTypes;
export default Posts;
