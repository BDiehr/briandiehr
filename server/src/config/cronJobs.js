import debug from 'debug';
import { CronJob } from 'cron';
import analyzeTopPosts from '../tasks/analyzeTopPosts';
import redditMarkovChain from '../tasks/redditMarkovChain';

function cronJobConfig(app) {
  debug('dev')('Initiating Cron Jobs');
  const task = new CronJob({
    cronTime: '0 0 0 * * *', // Once an day.
    onTick: analyzeTopPosts(app),
    start: false,
    timezone: 'UTC',
  });
  task.start();
}

export default cronJobConfig;
