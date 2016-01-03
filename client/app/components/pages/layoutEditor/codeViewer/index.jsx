import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import './codeViewer.scss';

export default class CodeViewer extends Component {
  static propTypes = {
    styleMap: PropTypes.any.isRequired,
  };

  render() {
    /** Determine if we should show the utility buttons */
    const styles = [];
    const styleIterator = this.props.styleMap.entries();
    for (const [key, value] of styleIterator) {
      const styleObj = {};
      styleObj[key] = value;
      styles.push(JSON.stringify(styleObj, null, 4));
    }

    return (
      <div className="code-viewer">
        <h3 className="text-center">Code Viewer</h3>
        <Highlight>
          {styles}
        </Highlight>
      </div>
    );
  }
}
