import React, { PropTypes } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import PostOverviewSummary from './postOverviewSummary';
import BarCounter from './barCounter';

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


const PostOverview = ({ posts }) => {
  const redditFirst = posts.filter(post => post.winner === 'REDDIT');
  const hackerNewsFirst = posts.filter(post => post.winner === 'HACKER_NEWS');
  const tied = posts.filter(post => post.winner === 'TIE');

  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h3>Percentage of Top Posts Submitted First</h3>
          <BarCounter
            redditCount={redditFirst.length}
            hackerNewsCount={hackerNewsFirst.length}
            tieCount={tied.length}
            />
        </Col>
      </Row>
      <Row>
        <br />
        <Col xs={12} sm={6}>
          <PostOverviewSummary
            posts={redditFirst}
            title="Reddit"
            />
        </Col>
        <Col xs={12} sm={6}>
          <PostOverviewSummary
            posts={hackerNewsFirst}
            title="HackerNews"
            />
        </Col>
      </Row>
    </Grid>
  );
};

PostOverview.propTypes = propTypes;
export default PostOverview;
