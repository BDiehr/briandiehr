const APIConstants = {
  dev: {
    SERVER_CONSTANT: 'http://localhost:3332',
  },
  production: {
    SERVER_CONSTANT: 'http://ec2-52-24-249-140.us-west-2.compute.amazonaws.com:3332',
  },
};

export default APIConstants[process.env.NODE_ENV];
