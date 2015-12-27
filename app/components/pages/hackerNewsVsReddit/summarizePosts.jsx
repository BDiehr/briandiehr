import React, { PropTypes } from 'react';
import DetailPost from './detailPost';
import uuid from 'node-uuid';
import 'styles/summarizePosts.scss';

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    winner: PropTypes.oneOf(['TIE', 'HACKER_NEWS', 'REDDIT']).isRequired,
    secondsDifference: PropTypes.number.isRequired,
    analyzed_at: PropTypes.string.isRequired,
    topPostId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

const SummarizePosts = ({ posts }) => {
  if (posts.length === 0) return null;
  const firstPost = posts[0];
  /** Grab the YYYY-MM-DD portion of an ISO string */
  const date = firstPost.analyzed_at.slice(0, 10);
  return (
    <div className="posts-summary">
      <h3>{date} ({posts.length} shared links)</h3>
      {posts.map(post => <DetailPost key={uuid.v4()} post={post} />)}
    </div>
  );
};

SummarizePosts.propTypes = propTypes;
export default SummarizePosts;
