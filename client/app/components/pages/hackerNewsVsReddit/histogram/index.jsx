import React, { PropTypes } from 'react';
import ReactHistogram from './reactHistorgram';
import './histogram.scss';

const propTypes = {
  data: PropTypes.array.isRequired,
};

const Histogram = ({ data }) => {
  return (
    <ReactHistogram
      data={data}
      width={700}
      height={300}
      />
  );
};

Histogram.propTypes = propTypes;
export default Histogram;
