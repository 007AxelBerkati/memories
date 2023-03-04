import axios from 'axios';

const url = 'https://memorize-kappa.vercel.app/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const signIn = (formData) => axios.post(`${url}/user/signin`, formData);

export const signUp = (formData) => axios.post(`${url}/user/signup`, formData);
