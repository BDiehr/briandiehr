import alt from '../util/alt';
import LayoutActions from '../actions/LayoutActions';
import TreeModel from 'tree-model';
import Immutable from 'immutable';
const treeModel = new TreeModel();

function idEq(id) {
  return function (node) {
    return node.model.id === id;
  };
}

class LayoutStore {
  constructor() {
    this.bindListeners({
      clear: LayoutActions.clear,
      selectItem: LayoutActions.selectItem,
      updateItemProperty: LayoutActions.updateItemProperty,
      deleteItem: LayoutActions.deleteItem,
      addItem: LayoutActions.addItem,
    });

    this.state = {
      HTMLTree: null,
      styleMap: Immutable.Map(),
      selectedId: 'root',
      selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        flexGrow: '1',
      },
    };
  }

  clear() {
    this.setState({
      HTMLTree: null,
      styleMap: Immutable.Map(),
      selectedId: 'root',
      selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        flexGrow: '1',
      },
    });
  }

  selectItem({ id, style }) {
    this.setState({
      selectedId: id,
      selectedStyle: style,
    });
  }

  updateItemProperty({ property, value }) {
    const updateObj = {};
    updateObj[property] = value;
    const updatedStyle = Object.assign({}, this.state.selectedStyle, updateObj);
    this.setState({
      selectedStyle: updatedStyle,
      styleMap: this.state.styleMap.set(this.state.selectedId, updatedStyle),
    });
  }

  deleteItem(id) {
    let updatedMap = this.state.styleMap;
    const removedSubtree = this.state.HTMLTree.first(idEq(id)).drop();
    removedSubtree.walk(node => {
      const nodeId = node.model.id;
      updatedMap = updatedMap.delete(nodeId);
    });
    this.setState({
      styleMap: updatedMap,
      HTMLTree: this.state.HTMLTree,
    } );
  }

  addItem({ id, parentId }) {
    if (this.state.HTMLTree != null) {
      const parentNode = this.state.HTMLTree.first(idEq(parentId));
      const childNode = treeModel.parse({ id });
      parentNode.addChild(childNode);
      this.setState({ HTMLTree: this.state.HTMLTree });
    } else {
      const root = treeModel.parse({ id });
      this.setState({ HTMLTree: root });
    }
  }
}

export default alt.createStore(LayoutStore, 'LayoutStore');
