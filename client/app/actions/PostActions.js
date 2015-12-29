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
    console.log('SUCCESS ACTION');
    return posts;
  }

  getRedditMarkovPostsFailed() {
    console.log('FAILED ACTION');
    this.dispatch();
  }

  getRedditMarkovPostsLoading() {
    this.dispatch();
  }
}

export default alt.createActions(PostActions);
