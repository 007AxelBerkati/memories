import { CREATE, FETCH_ALL } from '../types';

export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];

    default:
      return posts;
  }
};
