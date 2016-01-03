import React, { Component, PropTypes } from 'react';
import CSSViewer from './CSSViewer';
import HTMLViewer from './HTMLViewer';
import './codeViewer.scss';

export default class CodeViewer extends Component {
  static propTypes = {
    styleMap: PropTypes.any.isRequired,
    HTMLTree: PropTypes.any.isRequired,
  };

  render() {
    const { HTMLTree, styleMap } = this.props;
    return (
      <div className="code-viewer">
        <h2 className="text-center">CSS</h2>
        <CSSViewer styleMap={styleMap} />
        <h2 className="text-center">HTML</h2>
        <HTMLViewer HTMLTree={HTMLTree} />
      </div>
    );
  }
}
