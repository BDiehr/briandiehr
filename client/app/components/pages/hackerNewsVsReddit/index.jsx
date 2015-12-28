import connectToStores from '../../../../node_modules/alt/utils/connectToStores';
import _ from 'lodash';
import uuid from 'node-uuid';
import React, {Component, PropTypes} from 'react';
import { Grid } from 'react-bootstrap';
import PostStore from '../../../stores/PostStore';
import SummarizePosts from './summarizePosts';
import PostOverview from './postOverview';
import Histogram from './histogram';
require('styles/home.scss');

const propTypes = {
  topPosts: PropTypes.arrayOf(PropTypes.shape({
    winner: PropTypes.oneOf(['TIE', 'HACKER_NEWS', 'REDDIT']).isRequired,
    secondsDifference: PropTypes.number.isRequired,
    analyzed_at: PropTypes.string.isRequired,
    topPostId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

@connectToStores
class Home extends Component {

  constructor(props, context) {
    super(props, context);
    PostStore.getPosts();
  }

  static getStores() {
    return [PostStore];
  }

  static getPropsFromStores() {
    const storeState = PostStore.getState();
    return {
      topPosts: storeState.topPosts,
    };
  }

  render() {
    const topPosts = this.props.topPosts;
    const groupedByDay = _.valuesIn(_.groupBy(topPosts, post => post.analyzed_at.slice(0, 10)));
    return (
      <div>
        <div className="body">
          <Grid>
            <h1 className="text-center">HackerNews Versus /r/programming</h1>
            <hr />
            <p>
              The programming-centric communities <a target="_blank" href="https://www.reddit.com/r/programming" title="/r/programming">/r/programming</a> and <a target="_blank" href="https://news.ycombinator.com/" title="HackerNews">HackerNews</a>
              &nbsp;are two of my favorite sites for news. As with many news sites, there is quite a bit of overlap between the two. It interested me, <em>how much</em> do these sites overlap,
              and more importantly, which site gets content out faster?
            </p>
            <small>
              <p>
                <strong>Disclaimer: </strong>
                This is all meant in good fun! This is not to be taken as a serious metric for the relative quality of these communities.
              </p>
            </small>
            <PostOverview posts={topPosts} />
            <hr/>
            <Histogram data={topPosts.map(post => Math.floor(post.secondsDifference / 60))} />
            <h3 className="text-center"> Freq. of time difference in minutes</h3>
            <hr/>
            <h2>Daily Win Log</h2>
            {groupedByDay.map(posts => <SummarizePosts key={uuid.v4()} posts={posts} />)}
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;
export default Home;
