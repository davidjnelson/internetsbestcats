import { postsReducer } from './postsReducer';

describe('Posts Reducer', () => {
  describe('SET_MESSAGE action', () => {
    it('sets the message', () => {
      expect(postsReducer(undefined, {
        type: 'SET_MESSAGE',
        message: 'test'
      })).toEqual({
        message: 'test',
        posts: []
      });
    });
  });

  describe('HYDRATE_POSTS action', () => {
    it('hydrates the posts', () => {
      expect(postsReducer(undefined, {
        type: 'HYDRATE_POSTS',
        posts: [
          {
            title: 'foo'
          },
          {
            title: 'foo2'
          }
        ]
      })).toEqual({
        posts: [
          {
            title: 'foo'
          },
          {
            title: 'foo2'
          }
        ]
      });
    });
  });

  describe('SAVE_POST_TOGGLE action', () => {
    it('hydrates the posts', () => {
      const initialState = {
        posts: [
          {
            link: 'foo',
            saved: false,
          },
          {
            link: 'foo2',
            saved: true
          }
        ]
      };

      expect(postsReducer(initialState,
        {
          type: 'SAVE_POST_TOGGLE',
          post: {
              link: 'foo',
              saved: false
          }
        })).toEqual({
        posts: [
          {
            link: 'foo',
            saved: true
          },
          {
            link: 'foo2',
            saved: true
          }
        ]
      });
    });
  });
});
