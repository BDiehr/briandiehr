import alt from '../util/alt';

class LayoutActions {
  selectItem({ id, style }) {
    return { id, style };
  }

  updateItemProperty({ property, value }) {
    return { property, value };
  }
}

export default alt.createActions(LayoutActions);
