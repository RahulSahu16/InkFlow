const express = require('express');
const { createPost, updatePost, deletePost , getMyPosts } = require('../controllers/post.controller');
const protect = require('../middleware/auth.middleware');

const postRouter = express.Router();

postRouter.post('/create', protect , createPost);
postRouter.put('/:id', protect, updatePost);
postRouter.delete('/:id', protect, deletePost);
postRouter.get('/my-posts', protect, getMyPosts);


module.exports = postRouter;