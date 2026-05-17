const express = require('express');
const feedRouter = express.Router();

const { getAllPosts,getOnePost,getTrendingPosts,getLatestPosts,getComments,likePost,commentOnPost,sharePost,} = require('../controllers/feed.controller');

feedRouter.get('/', getAllPosts);
feedRouter.get('/posts/:id', getOnePost);   
feedRouter.get('/trending', getTrendingPosts);
feedRouter.get('/latest', getLatestPosts);
feedRouter.get('/posts/:id/comments', getComments);
feedRouter.post('/posts/:id/like', likePost);
feedRouter.post('/posts/:id/comments', commentOnPost);
feedRouter.post('/posts/:id/share', sharePost);

module.exports = feedRouter;