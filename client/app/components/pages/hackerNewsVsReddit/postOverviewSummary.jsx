import React, { PropTypes } from 'react';
import { jStat } from 'jStat';
import '../../../styles/postOverviewSummary.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    winner: PropTypes.oneOf(['TIE', 'HACKER_NEWS', 'REDDIT']).isRequired,
    secondsDifference: PropTypes.number.isRequired,
    analyzed_at: PropTypes.string.isRequired,
    topPostId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

function prettyTimeDifference(secondsDifference) {
  let prettyTime;
  if (secondsDifference > 60 * 4) {
    prettyTime = `${Math.floor(secondsDifference / 60)} Minutes`;
  } else {
    prettyTime = `${secondsDifference} Seconds`;
  }
  return prettyTime;
}

const PostOverviewSummary = ({ posts, title }) => {
  const secondsDiff = posts.map(post => post.secondsDifference);
  return (
    <div className="post-overview">
      <div className="post-overview__title">{title}</div>
      <div className="post-overview__container">
        <div><strong>Wins:</strong> {posts.length}</div>
        <div><strong>Avg. Time Diff: </strong>{prettyTimeDifference(Math.floor(jStat(secondsDiff).mean()))}</div>
        <div><strong>Std Dev: </strong>{Math.floor(jStat(secondsDiff).stdev())}</div>
        <div><strong>10th Percentile: </strong>{prettyTimeDifference(Math.floor(jStat.percentile(secondsDiff, 0.1)))}</div>
      </div>
    </div>
  );
};

PostOverviewSummary.propTypes = propTypes;
export default PostOverviewSummary;
