import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import { Grid, Input, Button, Col, Row } from 'react-bootstrap';
import Posts from './posts';
import PostStore from '../../../stores/PostStore';
require('styles/home.scss');

const propTypes = {
  redditMarkovPosts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  })),
  redditMarkovPostsLoadingStatus: PropTypes.string.isRequired,
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
      redditMarkovPostsLoadingStatus: storeState.redditMarkovPostsLoadingStatus,
    };
  }

  fetchSubreddit(e) {
    e.preventDefault();
    const subreddit = this.refs.subreddit.getValue();
    this.props.history.push(`/reddit-markov-chains?subreddit=${encodeURIComponent(subreddit)}`);
    this.setState({ subreddit });
    PostStore.getRedditMarkovPosts(subreddit);
  }

  render() {
    const posts = this.props.redditMarkovPosts;
    const loadingStatus = this.props.redditMarkovPostsLoadingStatus;
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
            <Posts posts={posts} loadingStatus={loadingStatus} subreddit={subreddit} />
            <br />
            <hr />
            <br />
            <h2>What Am I looking at here?</h2>
            <p>
              You are looking at <a href="https://en.wikipedia.org/wiki/Markov_chain" target="_blank" title="Markov Chains">Markov Chains</a>!
              I have created scripts which analyze several thousand reddit posts for each subreddit requested, to create a seed file which is fed into the Markov Chain.
              Once the seed file is place into the Markov Chain, I grab the top 25 posts on the selected subreddit. For each title, I input the first word of the title into the Markov Chain
              which then generates the rest of the title.
            </p>
            <h2>How It's Made</h2>
            <h3>Caching</h3>
            <p>
              To get interesting results you need to scrape many post titles. To make the results specific to a subreddit, I maintain many different seed files, as well as
              keep the top posts up to date with the respective subreddits. <em>There are a lot of subreddits</em>, and around 10,000 active subreddits. This is way more subreddits than my
              measly <a href="https://www.digitalocean.com/" target="_blank" title="DigitcalOcean">Digital Ocean</a> droplet could ever handle with out some aggressive caching. I am
              currently using <code>LRU-Caching</code>, with a max-age of 30 minutes.
            </p>
            <h3>Reddit API</h3>
            <p>
              I utilize the reddit API to grab the top 100 posts titles to create the string which gets fed into the Markov Chain. This appears to be enough data to create some
              interesting results, but a small enough sample size to allow many of the titles to retain their original context.
            </p>
            <h3>Contribute!</h3>
            <p>
              <a href="https://github.com/bdiehr/briandiehr" target="_blank" title="GitHub">All code is available here</a> and will gladly accept pull requests!
            </p>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;
export default Home;
