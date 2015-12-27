import fs from 'fs';
import settings from './settings';

function initKnex(app) {
  /** Initialize database connection */
  const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
  });

  /** Initialize all tables */
  const modelsPath = `${settings.app.root}/tables`;
  fs.readdirSync(modelsPath).forEach((file) => {
    if (file.indexOf('js') >= 0) {
      require(`${modelsPath}/${file}`)(knex);
    }
  });

  app.knex = knex;
}

export default initKnex;
