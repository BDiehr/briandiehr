import React, { PropTypes } from 'react';
import '../../../styles/barCounter.scss';

const propTypes = {
  redditCount: PropTypes.number.isRequired,
  hackerNewsCount: PropTypes.number.isRequired,
};

const PostOverviewSummary = ({ redditCount, hackerNewsCount, tieCount }) => {
  const totalCount = redditCount + hackerNewsCount + tieCount;
  const redditWidth = (redditCount / totalCount) * 100;
  const tieWidth = (tieCount / totalCount) * 100;
  const hackerNewsWidth = (hackerNewsCount / totalCount) * 100;
  return (
    <div className="bar-counter">
      <div style={{flexBasis: `${redditWidth}%`}} className="bar-counter__reddit">Reddit ({Math.floor(redditWidth)}%)</div>
      <div style={{flexBasis: `${tieWidth}%`}} className="bar-counter__tie" />
      <div style={{flexBasis: `${hackerNewsWidth}%`}} className="bar-counter__hacker-news">HackerNews ({Math.floor(hackerNewsWidth)}%)</div>
    </div>
  );
};

PostOverviewSummary.propTypes = propTypes;
export default PostOverviewSummary;
