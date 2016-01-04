import connectToStores from 'alt/utils/connectToStores';
import _ from 'lodash';
import LayoutStore from '../../../../stores/LayoutStore';
import React, { Component, PropTypes} from 'react';
import classNames from 'classnames';
import LayoutActions from '../../../../actions/LayoutActions';
import HoverButtons from './hoverButtons';
import InternalItem from './internalItem';
import './item.scss';

@connectToStores
class Item extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    children: PropTypes.any,
    number: PropTypes.number,
    id: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    parentId: PropTypes.string,
    selectedStyle: PropTypes.object,
    selectedId: PropTypes.string,
    registerHoveredState: PropTypes.func,
    markToDelete: PropTypes.func,
    getCounter: PropTypes.func.isRequired,
    incrementCounter: PropTypes.func.isRequired,
  };

  state = {
    hover: false,
    childHoverStates: new Map(),
    childItems: [],
    style: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      flexGrow: '1',
    },
  };

  componentWillMount() {
    LayoutActions.addItem({ id: this.props.id, parentId: this.props.parentId });
  }

  componentDidUpdate(prevProps, prevState) {
    /** Handle registered hover map */
    if (prevState.hover !== this.state.hover) {
      const { registerHoveredState, id } = this.props;
      if (registerHoveredState) registerHoveredState(id, this.state.hover);
    }
    /** Handle change in selected Style */
    if (this.isSelected() && !_.isEqual(this.state.style, this.props.selectedStyle)) {
      // TODO: Change this implementation not to set in `componentDidUpdate`.
      this.setState({style: this.props.selectedStyle});
    }
  }

  onMouseEnterHandler = () => {
    this.setState({ hover: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  onClick = () => {
    if (this.isLeafNodeAndHovered()) {
      this.selectItem();
    }
  };

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

  isLeafNodeAndHovered() {
    /** Determine if we should show the utility buttons */
    const iteratorOfChildHoverStates = this.state.childHoverStates.values();
    let hasHoveredChild = false;
    for (const hoverState of iteratorOfChildHoverStates) {
      if (hoverState) {
        hasHoveredChild = true;
        break;
      }
    }
    return this.state.hover && !hasHoveredChild;
  }

  isSelected() {
    return this.props.selectedId != null && this.props.id === this.props.selectedId;
  }

  childHoverStateRegistration = (id, state) => {
    const newMap = this.state.childHoverStates;
    newMap.set(id, state);
    this.setState({childHoverStates: newMap});
  };

  selectItem = () => {
    LayoutActions.selectItem({ id: this.props.id, style: this.state.style });
  };

  deleteChild = (id) => {
    return () => {
      LayoutActions.deleteItem(id);
      const newMap = this.state.childHoverStates;
      newMap.delete(id);
      this.setState({ childHoverStates: newMap });
      this.setState({ childItems: this.state.childItems.filter(item => item.props.id !== id) });
    };
  };

  addChild = () => {
    this.selectItem();
    const childItems = this.state.childItems;
    const itemId = `item-depth-${this.props.depth + 1}-num-${this.props.getCounter()}`;
    this.props.incrementCounter();
    const newItem = (
      <Item
        key={itemId}
        id={itemId}
        depth={this.props.depth + 1}
        parentId={this.props.id}
        markToDelete={this.deleteChild(itemId)}
        registerHoveredState={this.childHoverStateRegistration}
        />
    );
    this.setState({ childItems: childItems.concat(newItem) });
  };

  removeChild = () => {
    const markToDelete = this.props.markToDelete;
    if (markToDelete) markToDelete();
  };

  render() {
    const style = this.state.style;
    const containerClasses = classNames('layout-item-container', {
      'layout-item-container--selected': this.isSelected(),
    });

    return (
      <div
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        className={containerClasses}>
        {this.isLeafNodeAndHovered() ? (
          <HoverButtons
            addChild={this.addChild}
            removeChild={this.removeChild}
            showDetails={this.selectItem}
            isRoot={this.props.id === 'root'}
            />
        ) : null}
        <InternalItem
          onClick={this.onClick}
          addChild={this.addChild}
          id={this.props.id}
          style={style}
          getCounter={this.props.getCounter}
          incrementCounter={this.props.incrementCounter}
          >
          {this.state.childItems}
        </InternalItem>
      </div>
    );
  }
}

export default Item;
