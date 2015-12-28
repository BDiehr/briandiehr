const APIConstants = {
  dev: {
    SERVER_CONSTANT: 'http://localhost:3332',
  },
  production: {
    SERVER_CONSTANT: 'http://162.243.240.28:3332',
  },
};

export default APIConstants[process.env.NODE_ENV] || APIConstants['production'];
