import request from '../util/request';
import { SERVER_CONSTANT } from '../constants/APIConstants';

class PostService {
  getPosts() {
    return new Promise((resolve, reject) => {
      request.get(`${SERVER_CONSTANT}/hackernews_vs_reddit/post`)
        .accept('json')
        .then(resp => {
          if (resp.status !== 200) reject(resp);
          else resolve(resp.body.topPosts);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default new PostService();
