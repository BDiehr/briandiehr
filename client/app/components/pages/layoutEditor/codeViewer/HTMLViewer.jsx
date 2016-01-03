import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/darkula.css';

function tabs(n) {
  let tabs = '';
  for(let i = 0; i < n; i++) {
    tabs = tabs + '\t';
  }
  return tabs;
}
function HTMLWalk(node, depth = 0) {
  if (node.children.length > 0) {
    return (
`${tabs(depth)}<div class="item ${node.model.id}">
  ${node.children
    .map(node => HTMLWalk(node, depth + 1))
    .reduce((a, b) => `${a}\n${b}`)
  }
${tabs(depth)}</div>`
    );
  } else {
    return `${tabs(depth)}<div class="item ${node.model.id}"></div>`
  }
}

export default class HTMLViewer extends Component {
  static propTypes = {
    HTMLTree: PropTypes.any.isRequired,
  };

  getPrettyHTML() {
    const HTMLTree = this.props.HTMLTree;
    if (HTMLTree != null)  {
      return HTMLWalk(HTMLTree);
    }

    return `<div class="item root" \>`;
  }

  render() {
    return (
      <Highlight className="html highlight">
        {this.getPrettyHTML()}
      </Highlight>
    );
  }
}
