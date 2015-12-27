import React, { PropTypes, Component } from 'react';
import d3 from 'd3';

function getYScale(data, height) {
  return d3.scale.linear().
    domain([0, d3.max(data, d => d.y)]).
    range([height, 0]);
}

function getXScale(data, width) {
  return d3.scale.linear().
    domain([0, d3.max(data)]).
    range([0, width]);
}

export default class Histogram extends Component {
  static propTypes = {
    top: React.PropTypes.number,
    right: React.PropTypes.number,
    bottom: React.PropTypes.number,
    left: React.PropTypes.number,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  };

  static defaultProps = {
    top: 20,
    right: 10,
    bottom: 30,
    left: 30,
  };

  render() {
    const { top, right, bottom, left, data, width, height } = this.props;
    const xScale = getXScale(data, width);
    const histogramDataFn = d3.layout.histogram().bins(xScale.ticks(20));
    const histogramData = histogramDataFn(data);
    const yScale = getYScale(histogramData, height);

    return (
      <div className="react-d3-histogram">
        <svg width={width + left + right} height={height + top + bottom}>
          <g transform={"translate(" + left + "," + top + ")"}>
            <XAxis height={height} scale={xScale} />
            {histogramData.map((d, i) => <Bar data={d} xScale={xScale} yScale={yScale} height={height} key={i} />)}
          </g>
        </svg>
      </div>
    );
  }
}

class Path extends Component {
  static propTypes = {
    scale: PropTypes.func.isRequired,
  };

  render() {
    const [start, end] = this.props.scale.range();
    const d = `M0${start},6V0H${end}V6`;
    return <path className="react-d3-histogram__domain" d={d} />;
  }
}

class Tick extends Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired,
    scale: React.PropTypes.func.isRequired,
  };

  render() {
    const { value, scale } = this.props;
    const textStyle = { textAnchor: 'middle' };

    return (
      <g className="react-d3-histogram__tick" transform={'translate(' + scale(value) + ',0)'}>
        <line x2="0" y2="6"></line>
        <text dy=".71em" y="9" x="0" style={textStyle}>{value}</text>
      </g>
    );
  }
}

export class XAxis extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    scale: PropTypes.func.isRequired
  };

  render() {
    const { height, scale } = this.props;
    const ticks = scale.ticks
      .apply(scale)
      .map((tick, i) => <Tick value={tick} scale={scale} key={i} />);

    return (
      <g className="react-d3-histogram__x-axis" transform={'translate(0,' + height + ')'}>
        <Path scale={scale} />
        <g>{ticks}</g>
      </g>
    );
  }
}

export class Bar extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    const { data, xScale, yScale, height } = this.props;
    const scaledX = xScale(data.x);
    const scaledY = yScale(data.y);
    const scaledDx = xScale(data.dx);
    return (
      <g className="react-d3-histogram__bar" transform={'translate(' + scaledX + ',' + scaledY + ')'}>
        <rect width={scaledDx - 1} height={height - scaledY} />
        <text dy="0.75em" y="6" x={scaledDx / 2} textAnchor="middle">{data.y > 0 ? data.y : null}</text>
      </g>
    );
  }
}
