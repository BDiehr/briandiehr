import connectToStores from 'alt/utils/connectToStores';
import LayoutStore from '../../../stores/LayoutStore';
import React, { Component, PropTypes } from 'react';
import Item from './item/index';
import Container from './container';
import DetailPane from './detailPane';
import './layoutEditor.scss';

@connectToStores
class LayoutEditor extends Component {
  static propTypes = {
    selectedId: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      style: {
        flexDirection: 'row',
      },
    };
  }

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

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
            <Item number={1} id="root" />
          </Container>
          <DetailPane {...this.props} />
        </div>
      </div>
    );
  }
}

export default LayoutEditor;
