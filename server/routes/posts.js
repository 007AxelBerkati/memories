import express from 'express';

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  getPostsBySearch,
  commentPost,
  getPostsByCreator,
} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/creator', getPostsByCreator);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router;
