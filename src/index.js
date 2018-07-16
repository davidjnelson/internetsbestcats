import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { getPostsFromReddit } from './actions/postActions';
import { localStorageCache } from './middleware/localStorageCache';

const store = createStore(
  rootReducer,
  // in development mode, add ability to use chrome devtools extension if present
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, localStorageCache)
);

ReactDOM.render(
  <Provider store={store}>
    <App style={{
      height: '100%'
    }} />
  </Provider>, document.getElementById('root')
);

store.dispatch(getPostsFromReddit());
