import alt from '../util/alt';

class PostActions {
  getPostsSuccess(topPosts) {
    return topPosts;
  }

  getPostsFailed() {
    this.dispatch();
  }

  getPostsLoading() {
    this.dispatch();
  }

  getRedditMarkovPostsSuccess(posts) {
    return posts;
  }

  getRedditMarkovPostsFailed() {
    this.dispatch();
  }

  getRedditMarkovPostsLoading() {
    this.dispatch();
  }
}

export default alt.createActions(PostActions);
