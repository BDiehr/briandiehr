import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <h1 className="text-center">404: Page does not exist.</h1>
        <h2 className="text-center">
          <a href="/#/">Click here to go home.</a>
        </h2>
      </div>
    );
  }
}

export default NotFound;
