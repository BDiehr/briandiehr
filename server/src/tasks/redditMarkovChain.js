import co from 'co';
import path from 'path';
import MarkovChain from 'markovchain';
import fs from 'fs';
import url from 'url';
import debug from 'debug';
import getTopStoriesReddit from '../services/getTopStoriesReddit';

function redditMarkovChainClosure(app) {
  return co.wrap(function * redditMarkovChain() {
    try {
      debug('dev')('Running analyzeTopPosts service');
      const topRedditPosts = (yield getTopStoriesReddit(25))
        .data.children.map(child => child.data);

      const numberOfPosts = 200;
      /** Fetch Reddit data */
      const redditTitleTxt = (yield getTopStoriesReddit(numberOfPosts))
        .data.children.map(child => child.data)
        .map(post => post.title)
        .reduce((a, b) => `${a}\n${b}`, '');

      const redditTitleSeedPath = path.resolve(__dirname, '..', 'static/reddit_markov_chain/seed.txt');
      yield new Promise((resolve, reject) => {
        fs.appendFile(redditTitleSeedPath, redditTitleTxt, (err, success) => {
          if (err) reject(err);
          else resolve(success);
        });
      });

      debug('dev')(`Completed scraping ${numberOfPosts} new reddit posts`);

      const contents = fs.readFileSync(redditTitleSeedPath);
      let quotes;
      try {
        quotes = new MarkovChain(redditTitleTxt);
      } catch (err) {
        console.log({markovErr: err});
      }

      const weirdRedditPosts = topRedditPosts.map(post => {
        const seedWord = post.title.split(' ')[0];
        const minWords = 3;
        const maxWords = 8;
        const randLength = Math.floor(Math.random * (maxWords - minWords) + minWords)
        return {
          url: post.url,
          title: quotes.start(seedWord).end(randLength).process(),
        }
      });

      const weirdRedditPostsPath = path.resolve(__dirname, '..', 'static/reddit_markov_chain/hot');
      yield new Promise((resolve, reject) => {
        fs.writeFile(weirdRedditPostsPath, JSON.stringify(weirdRedditPosts), (err, success) => {
          if (err) reject(err);
          else resolve(success);
        });
      });

    } catch (err) {
      debug('dev')({err, stack: err.stack});
    }
  });
}

export default redditMarkovChainClosure;
