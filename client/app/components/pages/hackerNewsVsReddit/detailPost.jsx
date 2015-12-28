import React, { PropTypes } from 'react';
import '../../../styles/detailPost.scss';
const propTypes = {
  post: PropTypes.shape({
    winner: PropTypes.oneOf(['TIE', 'HACKER_NEWS', 'REDDIT']).isRequired,
    secondsDifference: PropTypes.number.isRequired,
    analyzed_at: PropTypes.string.isRequired,
    topPostId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

function prettyWinnerName(name) {
  let prettyName;
  if (name === 'REDDIT') {
    prettyName = 'Reddit';
  } else if (name === 'HACKER_NEWS') {
    prettyName = 'Hacker News';
  } else {
    prettyName = 'Tie';
  }
  return prettyName;
}

function prettyTimeDifference(secondsDifference) {
  let prettyTime;
  if (secondsDifference > 60 * 4) {
    prettyTime = `${Math.floor(secondsDifference / 60)} Minutes`;
  } else {
    prettyTime = `${secondsDifference} Seconds`;
  }
  return prettyTime;
}

const PostDetails = ({ post }) => {
  return (
    <div className="post-details">
      <strong><a href={post.url} target="_blank" title={post.title}>{post.title}</a></strong> ({prettyWinnerName(post.winner)} by {prettyTimeDifference(post.secondsDifference)})
    </div>
  );
};

PostDetails.propTypes = propTypes;
export default PostDetails;
