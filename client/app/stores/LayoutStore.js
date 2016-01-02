import alt from '../util/alt';
import LayoutActions from '../actions/LayoutActions';

class LayoutStore {
  constructor() {
    this.bindListeners({
      selectItem: LayoutActions.selectItem,
      updateItemProperty: LayoutActions.updateItemProperty,
    });

    this.state = {
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
    this.setState({selectedStyle: Object.assign({}, this.state.selectedStyle, updateObj)});
  }
}

export default alt.createStore(LayoutStore, 'LayoutStore');
