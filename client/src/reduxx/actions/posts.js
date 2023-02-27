import * as api from '../../api';
import { CREATE, FETCH_ALL, LOADING } from '../types';

// Action Creators
export const getPosts = () => async (dispatch) => {
  dispatch({ type: LOADING, loading: true });
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: LOADING, loading: false });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: LOADING, loading: false });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
