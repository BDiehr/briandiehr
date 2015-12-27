import _ from 'lodash';
import path from 'path';
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const root = path.normalize(__dirname + '/..');

const base = {
  app: {
    env,
    root,
  },
};

const specific = {
  development: {
    app: {
      port: 3332,
    },
    postgres: {
      host: `localhost`,
      user: 'development',
      password: 'thispasswordisinsecure',
      database: 'template1',
      charset: 'utf8',
    },
  },
};

export default _.merge(base, specific[env]);
