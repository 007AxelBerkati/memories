import { CREATE, FETCH_ALL } from '../types';

const initialStatePost = {
  posts: [],
  loading: false,
};

export const postReducer = (state = initialStatePost, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};
