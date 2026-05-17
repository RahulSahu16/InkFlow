const Feed = require("../models/feed.model");

const getAllPosts = async (req, res) => {
  try {
    const feeds = await Feed.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Posts retrieved successfully",
      feeds,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving posts",
      error: error.message,
    });
  }
};

const getOnePost = async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id).populate(
      "author",
      "username",
    );

    if (!feed) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post retrieved successfully",
      feed,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving post",
      error: error.message,
    });
  }
};

const getTrendingPosts = async (req, res) => {
  try {
    const trendingPosts = await Feed.find()
      .sort({ likes: -1 })
      .limit(10)
      .populate("author", "username");

    res.status(200).json({
      message: "Trending posts retrieved successfully",
      trendingPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving trending posts",
      error: error.message,
    });
  }
};

const getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Feed.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author", "username");

    res.status(200).json({
      message: "Latest posts retrieved successfully",
      latestPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving latest posts",
      error: error.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const alreadyLiked = post.likes.includes(req.user._id);
    if (alreadyLiked) {
      return res.status(400).json({
        message: "You have already liked this post",
      });
    }
    post.likes.push(req.user._id);
    await post.save();
    res.status(200).json({
      message: "Post liked successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while liking post",
      error: error.message,
    });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const comment = {
      user: req.user._id,
      text: req.body.text,
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json({
      message: "Comment added successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while adding comment",
      error: error.message,
    });
  }
};

const sharePost = async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    post.shares += 1;
    await post.save();
    res.status(200).json({
      message: "Post shared successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while sharing post",
      error: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id).populate(
      "comments.user",
      "username",
    );
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Comments retrieved successfully",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving comments",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  getTrendingPosts,
  getLatestPosts,
  getComments,
  likePost,
  commentOnPost,
  sharePost,
};
