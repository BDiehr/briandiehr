import alt from '../util/alt';
import { datasource } from '../../node_modules/alt/utils/decorators';
import PostSource from '../sources/PostSource';
import PostActions from '../actions/PostActions';

@datasource(PostSource)
class PostStore {
  constructor() {
    this.bindListeners({
      getPostsSuccess: PostActions.getPostsSuccess,
      getPostsFailed: PostActions.getPostsFailed,
      getPostsLoading: PostActions.getPostsLoading,
    });

    this.state = {
      topPosts: [],
      postsLoadingStatus: 'IDLE',
    };
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
}

export default alt.createStore(PostStore, 'PostStore');
