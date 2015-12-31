import alt from '../util/alt';
import { datasource } from '../../node_modules/alt/utils/decorators';
import PostSource from '../sources/PostSource';
import PostActions from '../actions/PostActions';

@datasource(PostSource)
class PostStore {
  constructor() {
    this.bindListeners({
      clear: PostActions.clear,
      /** HackerNews vs. Reddit */
      getPostsSuccess: PostActions.getPostsSuccess,
      getPostsFailed: PostActions.getPostsFailed,
      getPostsLoading: PostActions.getPostsLoading,
      /** Reddit Markov Chain */
      getRedditMarkovPostsSuccess: PostActions.getRedditMarkovPostsSuccess,
      getRedditMarkovPostsFailed: PostActions.getRedditMarkovPostsFailed,
      getRedditMarkovPostsLoading: PostActions.getRedditMarkovPostsLoading,
    });

    this.state = {
      /** HackerNews vs. Reddit */
      topPosts: [],
      postsLoadingStatus: 'IDLE',
      /** Reddit Markov Chain */
      redditMarkovPosts: [],
      redditMarkovPostsLoadingStatus: 'IDLE',
    };
  }

  clear() {
    this.setState({
      /** HackerNews vs. Reddit */
      topPosts: [],
      postsLoadingStatus: 'IDLE',
      /** Reddit Markov Chain */
      redditMarkovPosts: [],
      redditMarkovPostsLoadingStatus: 'IDLE',
    });
  }

  getPostsSuccess(topPosts) {
    this.setState({ topPosts, postsLoadingStatus: 'IDLE' });
  }

  getPostsFailed() {
    this.setState({ postsLoadingStatus: 'FAILED' });
  }

  getPostsLoading() {
    this.setState({ postsLoadingStatus: 'LOADING' });
  }

  getRedditMarkovPostsSuccess(redditMarkovPosts) {
    this.setState({ redditMarkovPosts, redditMarkovPostsLoadingStatus: 'IDLE' });
  }

  getRedditMarkovPostsFailed() {
    this.setState({ redditMarkovPostsLoadingStatus: 'FAILED' });
  }

  getRedditMarkovPostsLoading() {
    this.setState({ redditMarkovPostsLoadingStatus: 'LOADING' });
  }
}

export default alt.createStore(PostStore, 'PostStore');
