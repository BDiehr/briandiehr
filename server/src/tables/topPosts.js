import debug from 'debug';

function initTable(knex) {
  knex.schema
    .createTableIfNotExists('topPosts', (table) => {
      debug('dev')('Creating Top Posts Table');
      table.increments('topPostId');
      table.string('url').unique();
      table.enum('winner', ['HACKER_NEWS', 'REDDIT', 'TIE']);
      table.string('title');
      table.integer('secondsDifference');
      table.dateTime('analyzed_at').defaultTo(new Date().toISOString());
    })
    .catch(err => {
      debug('dev')(err);
    });
}

export default initTable;
