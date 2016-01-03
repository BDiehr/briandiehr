import connectToStores from 'alt/utils/connectToStores';
import LayoutStore from '../../../stores/LayoutStore';
import React, { Component, PropTypes } from 'react';
import Item from './item/index';
import Container from './container';
import DetailPane from './detailPane';
import CodeViewer from './codeViewer';
import './layoutEditor.scss';

@connectToStores
class LayoutEditor extends Component {
  static propTypes = {
    selectedId: PropTypes.string.isRequired,
    styleMap: PropTypes.any.isRequired,
    HTMLTree: PropTypes.any.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { counter: 0 };
  }

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

  getCounter = () => {
    return this.state.counter;
  };

  incrementCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div>
        <div className="body">
          <h3 className="text-center">Flex Box Editor</h3>
          <hr />
          <div className="directions">
            <h4>Directions</h4>
            <ol>
              <li>Hover over a box to see the controls to add child elements, select or remove (if it's not the root element).</li>
              <li>A selected <span className="green-example">green</span> box can be modified by the control panel below.</li>
            </ol>
          </div>
          <Container>
            <Item getCounter={this.getCounter} incrementCounter={this.incrementCounter} number={1} id="root" depth={0}/>
          </Container>
          <DetailPane {...this.props} />
          <CodeViewer
            HTMLTree={this.props.HTMLTree}
            styleMap={this.props.styleMap}
            />
        </div>
      </div>
    );
  }
}

export default LayoutEditor;
