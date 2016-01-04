import React, { Component} from 'react';
import Draggable from './draggable';
import './dragMenu.scss';

class Home extends Component {
  render() {
    return (
      <div className="drag-menu">
        <h2 className="text-center">Drag Menu</h2>
        <hr />
        <h4 className="text-center">Box</h4>
        <Draggable text=""/>
      </div>
    );
  }
}

export default Home;
