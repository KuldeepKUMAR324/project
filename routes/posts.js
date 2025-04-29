const express = require('express');
const Post = require('../models/post');
const { isLoggedIn } = require('./middleware');
const router = express.Router();


router.get('/', async (req, res) => {
  const posts = await Post.find({}).populate('author');
  res.render('posts/index', { posts });
});


router.get('/new', isLoggedIn, (req, res) => {
  res.render('posts/new');
});


router.post('/', isLoggedIn, async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({ title, description, author: req.user._id });
  await post.save();
  res.redirect('/posts');
});


router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  res.render('posts/show', { post });
});


router.get('/:id/edit', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { post });
});


router.post('/:id/edit', isLoggedIn, async (req, res) => {
  const { description } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { description });
  res.redirect(`/posts/${req.params.id}`);
});


router.post('/:id/delete', isLoggedIn, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/posts');
});

module.exports = router;
