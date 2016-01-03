import alt from '../util/alt';

class LayoutActions {
  selectItem({ id, style }) {
    return { id, style };
  }

  updateItemProperty({ property, value }) {
    return { property, value };
  }

  deleteItem(id) {
    return id;
  }

  addItem({ id, parentId }) {
    return { id, parentId };
  }
}

export default alt.createActions(LayoutActions);
