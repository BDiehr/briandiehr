import React, { Component} from 'react';
import { Grid } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="body">
          <Grid>
            <h1 className="text-center">Contribute</h1>
            <hr />
            <p>
              I'm Brian Diehr, I live in Tampa, FL and run a <a href="http://wuggastudios.com/" target="_blank">consulting agency</a> where I get the
              chance to create exciting web based applications on a day to day basis.
            </p>
            <p>
              I went to school at Michigan Technological University where I got my bachelors in Mathematics, and got the opportunity to learn a lot about both
              algebraic theory, real analysis and statistical modeling. Mathematics has been a long life love of mine, as it provides a timeless, backbone to the sciences as well as
              being beautifully counter intuitive.
            </p>
            <p>
              Similar to my love for mathematics, programming has been a creative outlet for me throughout my entire life, taking inspiration from my father and older brother
              who are (were) both programmers. Like many programmers, I initially was drawn into programming as a tool to create totally-awesome video games (at least I thought so!).
            </p>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
