import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight';
import _ from 'lodash';
import 'highlight.js/styles/darkula.css';

export default class CodeViewer extends Component {
  static propTypes = {
    styleMap: PropTypes.any.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.styleMap !== this.props.styleMap;
  }

  // TODO: Implement this method instead
  // objToCss(style, rootSelector = '', styles = []) {
  //   var rootStyle = '';
  //   Object.keys(style).forEach((key) => {
  //     let spacer = ' ',
  //       firstLetter = key[0],
  //       selector = key;
  //
  //     if (firstLetter === '&') {
  //       spacer = '';
  //       selector = key.substring(1);
  //     }
  //     selector = selector.replace(/&/g, rootSelector);
  //     if (typeof style[key] !== 'object') {
  //       rootStyle += toKebab(key) + ':' + style[key] + '; ';
  //     } else {
  //       if (firstLetter === ':') {
  //         spacer = '';
  //       }
  //       var newKey = rootSelector + spacer + selector;
  //       this.objToCss(style[key], newKey, styles);
  //     }
  //   });
  //   styles.unshift(rootSelector.trim() + '{' + rootStyle.trim() + '}');
  //   return styles.join('\n');
  // }
  getPrettyCSS() {
    /** Determine if we should show the utility buttons */
    const styles = [];
    const styleIterator = this.props.styleMap.entries();
    for (const [key, value] of styleIterator) {
      const reactStyleObj = value;
      const stdStyleObj = {};
      for (const styleKey in reactStyleObj) {
        stdStyleObj[_.kebabCase(styleKey)] = reactStyleObj[styleKey];
      }
      const styleObj = {};
      styleObj[`.${key}`] = stdStyleObj;
      const cssStyle = JSON.stringify(styleObj, null, 4)
        .replace(/"/g, '')
        .replace(/,/g, ';')
        .replace(/}([^}]*)$/,'$1')
        .replace('{', '')
        .replace(':', '')
        .slice(0, -7)
        .concat(';\n    }\n');
      styles.push(cssStyle);
    }

    return styles;
  }

  render() {
    return (
      <Highlight className="css highlight">
{ `   .item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      flex-grow: 1;
    }
`}
        {this.getPrettyCSS()}
      </Highlight>
    );
  }
}
