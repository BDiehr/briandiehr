import React, { Component, PropTypes} from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';

const boxTarget = {
  drop(props, monitor) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) return;
    return { id: props.id, addChild: props.addChild };
  }
};

@DropTarget('ITEM', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
}))
class InternalItem extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    children: PropTypes.any,
    style: PropTypes.object.isRequired,
    number: PropTypes.number,
    id: PropTypes.string.isRequired,
    getCounter: PropTypes.func.isRequired,
    incrementCounter: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
  };


  renderChildren() {
    const children = this.props.children || [];
    if (this.props.id === 'root' && children.length === 0) {
      return <div className="intro-text">Hover Over Me To See Options!</div>;
    } else {
      return children.map((child, i) => React.cloneElement(child, {
        number: i,
        getCounter: this.props.getCounter,
        incrementCounter: this.props.incrementCounter,
      }));
    }
  }

  render() {
    const { isOver, isOverCurrent, connectDropTarget, style, onClick } = this.props;
    const classes = classNames({
      'layout-item': true,
      'layout-item--hover': isOverCurrent,
    });

    return connectDropTarget(
      <div
        onClick={onClick}
        style={style}
        className={classes}
        >
        {this.renderChildren()}
      </div>
    );
  }
}

export default InternalItem;
