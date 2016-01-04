import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import './draggable.scss';
/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      dropResult.addChild.call(null);
    }
  }
};

@DragSource('ITEM', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Draggable extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div className="draggable" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}
