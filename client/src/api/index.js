import axios from 'axios';
import { backendAPI } from '../constant/environment';

// const url = 'https://memorize-kappa.vercel.app/posts';

const API = axios.create({ baseURL: backendAPI });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).credential
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`${'/posts'}/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);

export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);
