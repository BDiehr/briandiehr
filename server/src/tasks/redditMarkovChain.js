import co from 'co';
import path from 'path';
import MarkovChain from 'markovchain';
import fs from 'fs';
import debug from 'debug';
import getTopStoriesReddit from '../services/getTopStoriesReddit';

function redditMarkovChainClosure(subreddit) {
  return co.wrap(function * redditMarkovChain() {
    const topRedditPosts = (yield getTopStoriesReddit(25, subreddit))
      .data.children.map(child => child.data);

    /** Ensure that the subreddit exists */
    if (topRedditPosts.length === 0) throw new Error('No such subreddit');

    const numberOfPosts = 100;
    /** Fetch Reddit data */
    const redditTitleTxt = (yield getTopStoriesReddit(numberOfPosts, subreddit))
      .data.children.map(child => child.data)
      .map(post => post.title)
      .reduce((a, b) => `${a}\n${b}`, '');

    const redditTitleSeedPath = path.resolve(__dirname, '..', `static/reddit_markov_chain/${subreddit}_seed.txt`);
    yield new Promise((resolve, reject) => {
      fs.appendFile(redditTitleSeedPath, redditTitleTxt, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    });

    debug('dev')(`Completed scraping ${numberOfPosts} new reddit posts fro ${subreddit}`);
    const quotes = new MarkovChain(redditTitleTxt);

    const weirdRedditPosts = topRedditPosts.map(post => {
      const seedWord = post.title.split(' ')[0];
      const minWords = 3;
      const maxWords = 8;
      const randLength = Math.floor(Math.random * (maxWords - minWords) + minWords);
      return {
        url: post.url,
        score: post.score,
        title: quotes.start(seedWord).end(randLength).process(),
      };
    });

    const weirdRedditPostsPath = path.resolve(__dirname, '..', `static/reddit_markov_chain/${subreddit}`);
    yield new Promise((resolve, reject) => {
      fs.writeFile(weirdRedditPostsPath, JSON.stringify(weirdRedditPosts), (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    });

    return weirdRedditPosts;
  });
}

export default redditMarkovChainClosure;
