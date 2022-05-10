import Post from '../models/post.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import jwt from 'jsonwebtoken';

export const fetchPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json(error);
    }
};
export const fetchPost = async (req, res) => {
    const { _id } = req.params;
    try {
        const posts = await Post.findById({ _id });
        res.json(posts);
    } catch (error) {
        res.json(error);
    }
};
export const createPost = async (req, res) => {
    const { content } = req.body;
    const newPost = new Post({ content });
    try {
        await newPost.save();
        res.json(newPost);
    } catch (error) {
        res.json(error);        
    }
};

export const deletePost = async (req, res) => {
    const { _id } = req.params;
    try {
        await Post.deleteOne({ _id });
        res.json('Post was successfully deleted');
    } catch (error) {
        res.json(error);
    }
};
export const editPost = async (req, res) => {
    const { _id } = req.params;
    try {
        const updatedPost = await Post.updateOne({ _id }, { $set: { content: req.body.content } });
        res.json(updatedPost);
    } catch (error) {
        res.json(error);
    }
};
export const likePost = async (req, res) => {
    const { _id } = req.params;
    try {
        //* Get sessioned user
        const post = await Post.findById({ _id });
        const token = await req.headers.authorization.split` `[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userWhoLiked = await User.findById(decoded.user.username);

        const likedPost = await post.updateOne({ _id }, { $set: { likes: likes + 1, likedBy: userWhoLiked } });
        res.json('Your post has successfully been updated ', likedPost);
    } catch (error) {
        res.json(error);
    }
};
export const addComment = async (req, res) => {
    const { params: { _id }, body: { commentContent } } = req;
    try {
        //* Get sessioned user
        const token = await req.headers.authorization.split` `[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userWhoCommented = await User.findById(decoded.user.username);

        const newComment = new Comment({ 
            commentContent,
            commentAuthor: userWhoCommented,
            commentedAt: Date.now(),
            postLocation: _id
        });
        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (error) {
        res.json(error);
    }
};
export const editComment = async (req, res) => {
    const { params: { _id }, body: { edited } } = req;
    try {
        const updatedComment = await Comment.updateOne({ _id }, { $set: { commentContent: edited } });
        res.json('Your comment has successfully been updated ', updatedComment);
    } catch (error) {
        res.json(error);
    }
};
export const deleteComment = async (req, res) => {
    const { params: { _id } } = req;
    try {
        const updatedComment = await Comment.deleteOne({ _id });
        res.json('The comment has been deleted');
    } catch (error) {
        res.json(error);
    }
};