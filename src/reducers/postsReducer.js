const postsReducer = (state = {
                         message: 'Loading...',
                         posts: []
                       }, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return {
        message: action.message,
        posts: []
      };
    case 'HYDRATE_POSTS':
      return  {
        posts: action.posts,
      };
    case 'SAVE_POST_TOGGLE':
      return Object.assign({}, state, {
        posts: state.posts.map(post => {
          if(action.post.link === post.link) {
            return {...post, saved: !post.saved };
          }

          return post;
        })
      });
    default:
      return state;
  }
};

export { postsReducer }
