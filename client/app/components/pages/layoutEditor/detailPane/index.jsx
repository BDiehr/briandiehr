import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import LayoutActions from '../../../../actions/LayoutActions';
import { Button, Input, Tabs, Tab } from 'react-bootstrap';
import './detailPane.scss';

const StyleButton = ({display, actionProperty, actionValue, currentValue}) => {
  const classes = classNames('direction-btn-grp__btn', {
    'direction-btn-grp__btn--selected': currentValue === actionValue,
  });

  return (
    <Button
      className={classes}
      onClick={() => LayoutActions.updateItemProperty({ property: actionProperty, value: actionValue})}
      >
      {display}
    </Button>
  );
};

export default class DetailPane extends Component {
  static propTypes = {
    selectedId: PropTypes.string,
    selectedStyle: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      flexGrow: null,
      flexShrink: null,
      flexBasis: null,
      width: null,
      minWidth: null,
      maxWidth: null,
      height: null,
      minHeight: null,
      maxHeight: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedId !== this.props.selectedId && this.refs.form != null) {
      this.setFormToSelected();
    }
  }

  setFormToSelected() {
    this.setState({
      flexGrow: this.props.selectedStyle.flexGrow,
      flexShrink: this.props.selectedStyle.flexShrink,
      flexBasis: this.props.selectedStyle.flexBasis,
      width: this.props.selectedStyle.width,
      minWidth: this.props.selectedStyle.minWidth,
      maxWidth: this.props.selectedStyle.maxWidth,
      height: this.props.selectedStyle.height,
      minHeight: this.props.selectedStyle.minHeight,
      maxHeight: this.props.selectedStyle.maxHeight,
    });
  }

  updateItem(e) {
    e.preventDefault();
    const flexGrow = this.refs.flexGrow.getValue();
    const flexBasis = this.refs.flexBasis.getValue();
    const flexShrink = this.refs.flexShrink.getValue();
    const width = this.refs.width.getValue();
    const minWidth = this.refs.minWidth.getValue();
    const maxWidth = this.refs.maxWidth.getValue();
    const height = this.refs.height.getValue();
    const minHeight = this.refs.minHeight.getValue();
    const maxHeight = this.refs.maxHeight.getValue();

    if (flexGrow != null && flexGrow !== '') LayoutActions.updateItemProperty({ property: 'flexGrow', value: flexGrow });
    if (flexBasis != null && flexBasis !== '') LayoutActions.updateItemProperty({ property: 'flexBasis', value: flexBasis });
    if (flexShrink != null && flexShrink !== '') LayoutActions.updateItemProperty({ property: 'flexShrink', value: flexShrink });
    if (width != null && width !== '') LayoutActions.updateItemProperty({ property: 'width', value: width });
    if (minWidth != null && minWidth !== '') LayoutActions.updateItemProperty({ property: 'minWidth', value: minWidth });
    if (maxWidth != null && maxWidth !== '') LayoutActions.updateItemProperty({ property: 'maxWidth', value: maxWidth });
    if (height != null && height !== '') LayoutActions.updateItemProperty({ property: 'height', value: height });
    if (minHeight != null && minHeight !== '') LayoutActions.updateItemProperty({ property: 'minHeight', value: minHeight });
    if (maxHeight != null && maxHeight !== '') LayoutActions.updateItemProperty({ property: 'maxHeight', value: maxHeight });
  }

  handleChange = (ref) => {
    return () => {
      const stateUpdate = {};
      stateUpdate[ref] = this.refs[ref].getValue();
      this.setState(stateUpdate);
    };
  };

  renderStyleOptions() {
    const flexDirection = this.props.selectedStyle && this.props.selectedStyle.flexDirection;
    const justifyContent = this.props.selectedStyle && this.props.selectedStyle.justifyContent;
    const flexWrap = this.props.selectedStyle && this.props.selectedStyle.flexWrap;
    const alignItems = this.props.selectedStyle && this.props.selectedStyle.alignItems;
    if (this.props.selectedId != null) {
      return (
        <div className="controls-container">
          <div className="controls-wrapper">
            <div className="controls-wrapper__buttons">
              <div>
                <div className="control-label">Flex Direction</div>
                <div className="direction-btn-grp">
                  <StyleButton
                    display="Row"
                    currentValue={flexDirection}
                    actionValue="row"
                    actionProperty="flexDirection"
                    />
                  <StyleButton
                    display="Row Reverse"
                    currentValue={flexDirection}
                    actionValue="row-reverse"
                    actionProperty="flexDirection"
                    />
                  <StyleButton
                    display="Column"
                    currentValue={flexDirection}
                    actionValue="column"
                    actionProperty="flexDirection"
                    />
                  <StyleButton
                    display="Column Reverse"
                    currentValue={flexDirection}
                    actionValue="column-reverse"
                    actionProperty="flexDirection"
                    />
                </div>
              </div>
              <div>
                <div className="control-label">Align Items</div>
                <div className="direction-btn-grp">
                  <StyleButton
                    display="Stretch"
                    currentValue={alignItems}
                    actionValue="stretch"
                    actionProperty="alignItems"
                    />
                  <StyleButton
                    display="Start"
                    currentValue={alignItems}
                    actionValue="flex-start"
                    actionProperty="alignItems"
                    />
                  <StyleButton
                    display="End"
                    currentValue={alignItems}
                    actionValue="flex-end"
                    actionProperty="alignItems"
                    />
                  <StyleButton
                    display="Center"
                    currentValue={alignItems}
                    actionValue="center"
                    actionProperty="alignItems"
                    />
                  <StyleButton
                    display="Baseline"
                    currentValue={alignItems}
                    actionValue="baseline"
                    actionProperty="alignItems"
                    />
                </div>
              </div>
              <div>
                <div className="control-label">Justify Content</div>
                <div className="direction-btn-grp">
                  <StyleButton
                    display="Start"
                    currentValue={justifyContent}
                    actionValue="flex-start"
                    actionProperty="justifyContent"
                    />
                  <StyleButton
                    display="End"
                    currentValue={justifyContent}
                    actionValue="flex-end"
                    actionProperty="justifyContent"
                    />
                  <StyleButton
                    display="Center"
                    currentValue={justifyContent}
                    actionValue="center"
                    actionProperty="justifyContent"
                    />
                  <StyleButton
                    display="Space Between"
                    currentValue={justifyContent}
                    actionValue="space-between"
                    actionProperty="justifyContent"
                    />
                  <StyleButton
                    display="Space Around"
                    currentValue={justifyContent}
                    actionValue="space-around"
                    actionProperty="justifyContent"
                    />
                </div>
              </div>
              <div>
                <div className="control-label">Wrap</div>
                <div className="direction-btn-grp">
                  <StyleButton
                    display="No Wrap"
                    currentValue={flexWrap}
                    actionValue="nowrap"
                    actionProperty="flexWrap"
                    />
                  <StyleButton
                    display="Wrap"
                    currentValue={flexWrap}
                    actionValue="wrap"
                    actionProperty="flexWrap"
                    />
                  <StyleButton
                    display="Wrap Reverse"
                    currentValue={flexWrap}
                    actionValue="wrap-reverse"
                    actionProperty="flexWrap"
                    />
                </div>
              </div>
            </div>
            <form className="form form-horizontal" ref="form" onSubmit={this.updateItem.bind(this)}>
              <Tabs defaultActiveKey={1} animation={false} >
                <Tab eventKey={1} title="Flex Properties">
                  <div className="input-wrapper">
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('flexGrow')} value={this.state.flexGrow} ref="flexGrow" type="decimal" label="Grow" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('flexShrink')} value={this.state.flexShrink} ref="flexShrink" type="text" label="Shrink" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('flexBasis')} value={this.state.flexBasis} ref="flexBasis" type="text" label="Basis" />
                  </div>
                </Tab>
                <Tab eventKey={2} title="Sizing">
                  <div className="input-wrapper">
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('width')} value={this.state.width} ref="width" type="text" label="Width" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('minWidth')} value={this.state.minWidth} ref="minWidth" type="text" label="Min Width" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('maxWidth')} value={this.state.maxWidth} ref="maxWidth" type="text" label="Max Width" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('height')} value={this.state.height} ref="height" type="text" label="Height" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('minHeight')} value={this.state.minHeight} ref="minHeight" type="text" label="Min Height" />
                    <Input bsSize="small" labelClassName="col-xs-3" wrapperClassName="col-xs-8" onChange={this.handleChange('maxHeight')} value={this.state.maxHeight} ref="maxHeight" type="text" label="Max Height" />
                  </div>
                </Tab>
              </Tabs>
              <div className="update-btn-container">
                <Button className="update-btn" bsSize="small" type="submit">Update Item</Button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <h2 className="text-center">Select an Item to edit.</h2>;
    }
  }

  render() {
    return (
      <div className="detail-pane">
        {this.renderStyleOptions()}
      </div>
    );
  }
}
