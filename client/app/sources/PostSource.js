import PostService from '../services/PostService';
import PostActions from '../actions/PostActions';

const UserSource = {
  getPosts: {
    remote() {
      return PostService.getPosts();
    },
    success: PostActions.getPostsSuccess,
    loading: PostActions.getPostsLoading,
    error: PostActions.getPostsFailed,
    shouldFetch() {
      return true;
    },
  },
  getRedditMarkovPosts: {
    remote(state, subreddit = 'all') {
      return PostService.getRedditMarkovPosts(subreddit);
    },
    success: PostActions.getRedditMarkovPostsSuccess,
    loading: PostActions.getRedditMarkovPostsLoading,
    error: PostActions.getRedditMarkovPostsFailed,
    shouldFetch() {
      return true;
    },
  },
};

export default UserSource;
