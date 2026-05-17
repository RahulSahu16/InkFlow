const Feed = require("../models/feed.model");

const createPost = async(req, res) => {
    try{
        const { title , content } = req.body;

        if(!title || !content){
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const newPost = await Feed.create({
            title,
            content,
            author: req.user.userId,
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    
    } catch (error) {
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};

const updatePost = async(req, res) =>{
    try{

        const {title, content} = req.body;

        const post = await Feed.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Unauthorized to update this post"
            });
        }
        
        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating post",
            error: error.message
        });
    }
}

const deletePost = async(req, res) => {
    try{
        const post = await Feed.findById(req.params.id);    

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Unauthorized to delete this post"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
}

const getMyPosts = async(req, res) => {
    try{
        const posts = await Feed.find({ author: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "My posts retrieved successfully",
            posts
        }); 
    }
    catch(error){
        res.status(500).json({
            message: "Error occurred while retrieving my posts",
            error: error.message
        });
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getMyPosts
};  