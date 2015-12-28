import React, { Component} from 'react';
import { Grid } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <Grid>
            <h1 className="text-center">Contribute Code</h1>
            <hr />
            <p>
              Interested in peaking under the hook or to add additional anaylsis/data fetching? <a href="https://github.com/bdiehr/briandiehr" target="_blank" title="GitHub">pull requests are welcome</a>!
            </p>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
