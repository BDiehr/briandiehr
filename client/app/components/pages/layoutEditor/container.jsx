import React, { Component, PropTypes } from 'react';
import './layoutContainer.scss';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="layout-viewport">
        <div className="layout-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
