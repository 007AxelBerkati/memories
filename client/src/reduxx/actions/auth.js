import { AUTH } from '../types';

import * as api from '../../api/index.js';

export const signIn = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(form);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(form);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
