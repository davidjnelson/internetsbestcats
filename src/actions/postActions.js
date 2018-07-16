import axios from "axios/index";
import { getBaseUrl } from "../configuration/configuration";

export const normalizePosts = response => {
  return response.data.data.children.map(post => {
    return {
      title: post.data.title,
      thumbnail: post.data.thumbnail,
      link: getBaseUrl() + post.data.permalink,
      saved: false
    };
  })
};

export const dedupePostsByUrl = (postsFromLocalStorage, postsFromReddit) => {
  const postFromLocalStorageMap = new Map();
  const dedupedPostsFromReddit = [];

  if(postsFromLocalStorage) {
    postsFromLocalStorage.forEach(postFromLocalStorage => {
      postFromLocalStorageMap.set(postFromLocalStorage.link, postFromLocalStorage);
    });

    postsFromReddit.forEach(postFromReddit => {
      if(!postFromLocalStorageMap.has(postFromReddit.link)) {
        dedupedPostsFromReddit.push(postFromReddit);
      }
    });

    return postsFromLocalStorage.concat(dedupedPostsFromReddit);
  } else {
    return postsFromReddit;
  }
};

export const setMessage = message => {
  return {
    type: 'SET_MESSAGE',
    message
  }
};

export const savePost = post => {
  return {
    type: 'SAVE_POST_TOGGLE',
    post
  }
};


export const hydratePosts = (posts) => {
  return {
    type: 'HYDRATE_POSTS',
    posts
  }
};

export const getPostsFromReddit = () => {
  return async dispatch => {
    try {
      dispatch(setMessage('Loading...'));

      const response = await axios.get(`${getBaseUrl()}/r/cats/top/.json?limit=20`);

      if (response.status !== 200) {
        dispatch(setMessage('An error occured.  Please refresh the page.'));
        dispatch(hydratePosts([]));
      } else {
        dispatch(setMessage(''));
        const normalizedPostsFromReddit = normalizePosts(response);
        const postsFromLocalStorage = JSON.parse(window.localStorage.getItem('posts'));
        const dedupedPosts = dedupePostsByUrl(postsFromLocalStorage, normalizedPostsFromReddit);
        dispatch(hydratePosts(dedupedPosts));
      }
    } catch (error) {
      console.error(error);
      dispatch(setMessage('An error occured.  Please refresh the page.'));
      dispatch(hydratePosts([]));
    }
  }
};
