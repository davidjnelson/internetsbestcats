import { connect } from 'react-redux';
import { PostsList } from '../components/PostsList';
import { savePost } from "../actions/postActions";
import { createSelector } from 'reselect'

const getPosts = state => state.posts.posts;

const getOrderedPosts = createSelector(
  [getPosts],
  posts => posts.filter(post => post.saved).concat(posts.filter(post => !post.saved))
);

const mapStateToProps = state => {
  return {
    posts: getOrderedPosts(state),
    message: state.posts.message
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePinIconClick: (post) => {
      dispatch(savePost(post));
    }
  }
};

const ConnectedPostsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);

export { ConnectedPostsList }
