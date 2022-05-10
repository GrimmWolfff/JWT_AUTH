import express from 'express';
import { Auth } from '../middlewares/auth.js';
import { fetchPost, fetchPosts, createPost, deletePost, editPost,
likePost, addComment, editComment, deleteComment } from '../controllers/posts.js';

const postsRouter = express.Router();

postsRouter.get('/', Auth, fetchPosts);
postsRouter.post('/', Auth, createPost);
postsRouter.get('/:id', Auth, fetchPost);
postsRouter.delete('/:id', Auth, deletePost);
postsRouter.put('/:id', Auth, editPost);
postsRouter.put('/:id', Auth, likePost)

export default postsRouter;