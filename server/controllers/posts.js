// Mengimport express dan mongoose ke dalam file
import express from 'express';
import mongoose from 'mongoose';

// Mengimport model PostMessage dari file postMessage.js
import PostMessage from '../models/postMessage.js';

// Membuat instans router dari express
const router = express.Router();

// Function untuk mengambil semua post dari database dan menampilkan dalam bentuk JSON response
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function untuk mengambil satu post dari database dengan ID tertentu dan menampilkan dalam bentuk JSON response
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function untuk membuat sebuah post baru dalam database dan menampilkan dalam bentuk JSON response
export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Function untuk melakukan update pada post dalam database dengan ID tertentu dan menampilkan dalam bentuk JSON response
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  // Validasi apakah ID yang dikirimkan valid atau tidak
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  // Mengupdate post di database dengan menggunakan function findByIdAndUpdate()
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

// Function untuk menghapus sebuah post dari database dengan ID tertentu dan menampilkan pesan berhasil dihapus dalam bentuk JSON response
export const deletePost = async (req, res) => {
  const { id } = req.params;

  // Validasi apakah ID yang dikirimkan valid atau tidak
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // Menghapus post dari database dengan menggunakan function findByIdAndRemove()
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully.' });
};

// Function untuk melakukan like pada sebuah post di database dengan ID tertentu dan menampilkan post yang sudah di-like dalam bentuk JSON response
export const likePost = async (req, res) => {
  const { id } = req.params;

  // Validasi apakah user sudah login atau belum
  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  // Validasi apakah ID yang dikirimkan valid atau tidak
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // Mengambil post dari database dengan ID tertentu dan menyimpannya dalam variabel post
  const post = await PostMessage.findById(id);

  // Melakukan pencarian id dari user pada array likes pada variabel post dan menyimpan indeks hasil pencarian ke dalam variabel index
  const index = post.likes.fintIndex((id) => id === String(req.userId));

  // Jika indeks tidak ditemukan (-1), maka push id user ke dalam array likes pada variabel post
  if (index === -1) {
    post.likes.push(req.userId);
  }
  // Jika indeks ditemukan (tidak sama dengan -1), maka filter id user dari array likes pada variabel post
  else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // Mengupdate post di database dengan likes yang telah diubah menggunakan function findByIdAndUpdate()
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
