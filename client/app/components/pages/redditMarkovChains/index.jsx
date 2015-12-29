import connectToStores from '../../../../node_modules/alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import { Grid, Input, Button, Col, Row } from 'react-bootstrap';
import Post from './post';
import PostStore from '../../../stores/PostStore';
require('styles/home.scss');

const propTypes = {
  redditMarkovPosts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  })),
  location: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

@connectToStores
class Home extends Component {

  constructor(props, context) {
    super(props, context);
    const subreddit = this.props.location.query.subreddit || 'all';
    this.state = { subreddit };
    PostStore.getRedditMarkovPosts(subreddit);
  }

  static getStores() {
    return [PostStore];
  }

  static getPropsFromStores() {
    const storeState = PostStore.getState();
    return {
      redditMarkovPosts: storeState.redditMarkovPosts,
    };
  }

  fetchSubreddit(e) {
    e.preventDefault();
    const subreddit = this.refs.subreddit.getValue();
    this.props.history.push(`/reddit-markov-chains?subreddit=${encodeURIComponent(subreddit)}`);
    this.setState({ subreddit });
  }

  render() {
    const posts = this.props.redditMarkovPosts;
    const { subreddit } = this.state;

    return (
      <div>
        <div className="body">
          <Grid>
            <form>
              <Row>
                <Col xs={12}>
                  <h4>Why not try a different subreddit?</h4>
                </Col>
                <Col xs={8}>
                  <Input
                    required
                    type="text"
                    ref="subreddit"
                    addonBefore="/r/"
                    placeholder="subreddit i.e. aww"
                    />
                </Col>
                <Col xs={4}>
                  <Button
                    block
                    bsStyle="primary"
                    type="submit"
                    onClick={this.fetchSubreddit.bind(this)}
                    >
                    Let's Get Weird!
                  </Button>
                </Col>
              </Row>
            </form>
            <h1 className="text-center">/r/{subreddit} (but weirder)</h1>
            <hr />
            {posts.map(
              (post, i) => (
                <Post
                  key={i}
                  rank={i + 1}
                  score={post.score}
                  title={post.title}
                  url={post.url}
                />
              ))}
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;
export default Home;
