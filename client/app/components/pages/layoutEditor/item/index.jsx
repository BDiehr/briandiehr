import connectToStores from 'alt/utils/connectToStores';
import _ from 'lodash';
import LayoutStore from '../../../../stores/LayoutStore';
import React, { Component, PropTypes} from 'react';
import uuid from 'node-uuid';
import classNames from 'classnames';
import LayoutActions from '../../../../actions/LayoutActions';
import HoverButtons from './hoverButtons';
import './item.scss';

@connectToStores
class Item extends Component {
  static propTypes = {
    children: PropTypes.any,
    number: PropTypes.number,
    id: PropTypes.string.isRequired,
    selectedStyle: PropTypes.object,
    selectedId: PropTypes.string,
    registerHoveredState: PropTypes.func,
    markToDelete: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

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

  componentDidUpdate(prevProps, prevState) {
    /** Handle registered hover map */
    if (prevState.hover !== this.state.hover) {
      const { registerHoveredState, id } = this.props;
      if (registerHoveredState) registerHoveredState(id, this.state.hover);
    }
    /** Handle change in selected Style */
    if (this.isSelected() && !_.isEqual(this.state.style, this.props.selectedStyle)) {
      this.setState({style: this.props.selectedStyle});
    }
  }

  shouldShowButtons() {
    /** Determine if we should show the utility buttons */
    const iteratorOfChildHoverStates = this.state.childHoverStates.values();
    let hasHoveredChild = false;
    for(let hoverState of iteratorOfChildHoverStates) {
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

  onMouseEnterHandler = () => {
    this.setState({ hover: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  selectItem = () => {
    LayoutActions.selectItem({ id: this.props.id, style: this.state.style });
  };

  addChild = () => {
    this.selectItem();
    const childItems = this.state.childItems;
    const itemId = uuid.v4();
    const newItem = (
      <Item
        key={itemId}
        id={itemId}
        markToDelete={this.deleteChild(itemId)}
        registerHoveredState={this.childHoverStateRegistration}
        />
    );
    this.setState({childItems: childItems.concat(newItem) })
  };

  deleteChild = (id) => {
    return () => {
      const newMap = this.state.childHoverStates;
      newMap.delete(id);
      this.setState({childHoverStates: newMap});
      this.setState({childItems: this.state.childItems.filter(item => item.props.id !== id)})
    };
  };

  removeChild = () => {
    const markToDelete = this.props.markToDelete;
    if (markToDelete) markToDelete();
  };

  renderChildren() {
    const children = this.state.childItems || [];
    return children.map((child, i) => React.cloneElement(child, {
      number: i,
    }));
  }

  render() {
    const style = this.state.style;
    const classes = classNames('layout-item', {
      'layout-item--selected': this.isSelected(),
    });

    return (
      <div
        style={style}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        className={classes}
        >
        {this.shouldShowButtons() ? (
          <HoverButtons
            addChild={this.addChild}
            removeChild={this.removeChild}
            showDetails={this.selectItem}
            />
          ) : null}
        {this.renderChildren()}
      </div>
    );
  }
}

export default Item;
