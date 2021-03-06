import React, { Component, PropTypes } from 'react';
import './hoverButtons.scss';

export default class HoverButtons extends Component {
  static propTypes = {
    addChild: PropTypes.func.isRequired,
    removeChild: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired,
    isRoot: PropTypes.bool.isRequired,
  };

  render() {
    const { addChild, removeChild, showDetails } = this.props;
    return (
      <div className="hover-buttons-container">
        <div className="hover-buttons">
          <button className="hover-button" onClick={addChild}>Add</button>
          {!this.props.isRoot ? <button className="hover-button" onClick={removeChild}>Remove</button> : null}
          <button className="hover-button" onClick={showDetails}>Select</button>
        </div>
      </div>
    );
  }
}
