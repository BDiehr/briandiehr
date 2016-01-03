import alt from '../util/alt';
import LayoutActions from '../actions/LayoutActions';
import TreeModel from 'tree-model';
const treeModel = new TreeModel();

class LayoutStore {
  constructor() {
    this.bindListeners({
      selectItem: LayoutActions.selectItem,
      updateItemProperty: LayoutActions.updateItemProperty,
      deleteItem: LayoutActions.deleteItem,
      addItem: LayoutActions.addItem,
    });

    this.state = {
      HTMLTree: null,
      styleMap: new Map(),
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
    const updatedMap = this.state.styleMap;
    updatedMap.delete(id);
    this.setState({ styleMap: updatedMap } );
  }

  addItem({ id, parentId }) {
    if (this.state.HTMLTree != null) {
      const rootNode = this.state.HTMLTree;
      const childNode = treeModel.parse({ id: parentId });
      rootNode.addChildAtIndex(childNode, parentId);
      console.log({rootNode});
    } else {
      const root = treeModel.parse({ id });
      this.setState({ HTMLTree: root });
    }
  }
}

export default alt.createStore(LayoutStore, 'LayoutStore');
