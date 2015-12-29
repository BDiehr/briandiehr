import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';
require('styles/home.scss');

class Home extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <Grid>
            <h1 className="text-center">Recent Studies</h1>
            <hr />
            <h3><a href="/#/reddit-markov-chains">The weird world /r/programming (2015-12-28)</a></h3>
            <p>
              Need a little more nonsense in your daily dose of procrastinating under the thinly veiled guise of learning about your industry?
              I've taken a live updating feed of reddit posts to seed a markov chain to help keep /r/programming creative.
            </p>
            <h3><a href="/#/hacker-news-vs-reddit">HackerNews Versus Reddit (2015-12-27)</a></h3>
            <p>
              We take a look into the similarities between content posting, and learn some peculiar behaviors in this ongoing, live study.
            </p>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
