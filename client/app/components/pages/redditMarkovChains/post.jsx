import React, { PropTypes } from 'react';
import './post.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const Post = ({ title, url, rank, score }) => {
  return (
    <div className="reddit-post">
      <span className="reddit-post__rank">{rank}.</span>
      <span className="reddit-post__score">({score})</span>
      <a href={url} target="_blank" title={title}>{title}</a>
    </div>
  );
};

Post.propTypes = propTypes;
export default Post;
