import { AUTH } from '../types';

import * as api from '../../api/index';

export const signIn = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn();
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp();
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
