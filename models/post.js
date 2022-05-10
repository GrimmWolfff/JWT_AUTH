import mongoose from 'mongoose';
import User from './user.js';
// import Comment from './comment.js';

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    images: {
        type: String,
    },
    postedAt: {
        required: true,
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [String],
        default: []
    }
});
const Post = new mongoose.model('Post', PostSchema);
export default Post;