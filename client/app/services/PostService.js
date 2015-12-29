import request from '../util/request';
import { SERVER_CONSTANT } from '../constants/APIConstants';

class PostService {
  getPosts() {
    return new Promise((resolve, reject) => {
      request.get(`${SERVER_CONSTANT}/hackernews_vs_reddit/post`)
        .accept('text')
        .then(resp => {
          if (resp.status !== 200) reject(resp);
          else resolve(JSON.parse(resp.text).topPosts);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getRedditMarkovPosts(subreddit) {
    return new Promise((resolve, reject) => {
      request.get(`${SERVER_CONSTANT}/reddit_markov_chain/${subreddit}`)
        .accept('text')
        .accept('json')
        .then(resp => {
          if (resp.status !== 200) reject(resp);
          else resolve(resp.body || JSON.parse(resp.text));
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default new PostService();
