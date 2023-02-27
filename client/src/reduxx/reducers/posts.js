import { CREATE, FETCH_ALL, UPDATE } from '../types';

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

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};
