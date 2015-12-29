import co from 'co';
import path from 'path';
import MarkovChain from 'markovchain';
import fs from 'fs';
import debug from 'debug';
import getTopStoriesReddit from '../services/getTopStoriesReddit';

function redditMarkovChainClosure(subreddit) {
  return co.wrap(function * redditMarkovChain() {
    const lowerCaseSubreddit = subreddit.toLowerCase();

    /** Fetch top reddit posts */
    const topRedditPosts = (yield getTopStoriesReddit(25, lowerCaseSubreddit))
      .data.children.map(child => child.data);

    /** Ensure that the subreddit exists */
    if (topRedditPosts.length === 0) throw new Error('No such subreddit');

    /** Fetch text to input into Markov Chain */
    const numberOfPosts = 100;
    const redditTitleTxt = (yield getTopStoriesReddit(numberOfPosts, lowerCaseSubreddit))
      .data.children.map(child => child.data)
      .map(post => post.title)
      .reduce((a, b) => `${a}\n${b}`, '');

    debug('dev')(`Completed scraping ${numberOfPosts} new reddit posts for ${lowerCaseSubreddit}`);

    /** Feed text into Markov Chain */
    const quotes = new MarkovChain(redditTitleTxt);

    /** Generate weird reddit posts */
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

    const weirdRedditPostsPath = path.resolve(__dirname, '..', `static/reddit_markov_chain/${lowerCaseSubreddit}`);
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
