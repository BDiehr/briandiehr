import co from 'co';
import path from 'path';
import fs from 'fs';
import url from 'url';
import debug from 'debug';
import getTopStoriesHackerNews from '../services/getTopStoriesHackerNews';
import getTopStoriesReddit from '../services/getTopStoriesReddit';
import getHackerNewsPost from '../services/getHackerNewsPost';

/**
 * Constants
 */

const OUTCOME_CONSTANTS = {
  TIE: 'TIE',
  HACKER_NEWS: 'HACKER_NEWS',
  REDDIT: 'REDDIT',
};

/**
 * Utility Functions
 */

function areURLsEqual(aURL, bURL) {
  const a = url.parse(aURL);
  const b = url.parse(bURL);
  return a.hostname === b.hostname && a.path === b.path;
}

function parseHackerNewsPost(post) {
  return {
    title: post.title,
    created: post.time + 8 * 60 * 60,
  };
}

function parseRedditPost(post) {
  return {
    title: post.title,
    created: post.created,
  };
}

function analyzePostData(post) {
  let winner;
  if (post.hackerNewsPost.created > post.redditPost.created) {
    winner = OUTCOME_CONSTANTS.HACKER_NEWS;
  } else if (post.hackerNewsPost.created < post.redditPost.created) {
    winner = OUTCOME_CONSTANTS.REDDIT;
  } else {
    winner = OUTCOME_CONSTANTS.TIE;
  }

  return {
    winner: winner,
    url: post.url,
    title: post.hackerNewsPost.title,
    secondsDifference: Math.floor(Math.abs(post.hackerNewsPost.created - post.redditPost.created)),
  };
}

function scrapForTopPostsClosure(app) {
  return co.wrap(function * scrapForTopPosts() {
    try {
      debug('dev')('Running analyzeTopPosts service');
      const knex = app.knex;
      const numberOfPosts = 25;
      /** Fetch HackerNews data */
      const topIdsHackerNews = (yield getTopStoriesHackerNews()).slice(0, numberOfPosts);
      const hackerNewsPosts = (yield topIdsHackerNews.map(itemId => getHackerNewsPost(itemId))).filter(post => post.url !== undefined);
      const hackerNewsUrls = hackerNewsPosts.map(post => post.url);
      /** Fetch Reddit data */
      const redditPosts = (yield getTopStoriesReddit(numberOfPosts)).data.children.map(child => child.data).filter(post => post.url !== undefined);
      const redditUrls = redditPosts.map(post => post.url);
      /** Find Intersection of posts */
      const sharedUrls = redditUrls.filter(redditUrl => hackerNewsUrls.some(hackerNewsUrl => areURLsEqual(hackerNewsUrl, redditUrl)));
      const sharedPostsData = sharedUrls.map(sharedUrl => {
        return {
          url: sharedUrl,
          hackerNewsPost: parseHackerNewsPost(hackerNewsPosts.find(post => areURLsEqual(post.url, sharedUrl))),
          redditPost: parseRedditPost(redditPosts.find(post => areURLsEqual(post.url, sharedUrl))),
        };
      });

      /** Analyze the data */
      const analyzedPosts = sharedPostsData.map(analyzePostData);
      /** Add to database */
      yield knex('topPosts').insert(analyzedPosts);
      debug('dev')('Inserted new posts');
      const topPosts = yield knex('topPosts').select('*');
      debug('dev')('New Posts inserted in database');

      fs.writeFile(path.resolve(__dirname, '..', 'static/hackernews_vs_reddit/post'), JSON.stringify({topPosts, status: 200}), (err) => {
        if(err) debug('dev')({err});
        else debug('dev')(`Analyzed ${analyzedPosts.length} new posts.`);
      });
    } catch (err) {
      debug('dev')({err});
    }
  });
}

export default scrapForTopPostsClosure;
