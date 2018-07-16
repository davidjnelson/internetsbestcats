export const localStorageCache = store => next => action => {
  const result = next(action);

  if(store.getState('posts').posts.posts && store.getState('posts').posts.posts.length > 0) {
    window.localStorage.setItem('posts', JSON.stringify(store.getState('posts').posts.posts));
  }

  return result;
};
