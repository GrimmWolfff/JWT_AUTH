import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    commentAuthor: {
        type: String,
        required: true
    },
    commentContent: {
        type: String,
        required:true
    },
    commentLikes: {
        type: Number,
        default: 0
    },
    commentLikedBy: {
        type: [String],
        default: []
    },
    commentedAt: {
        type: Date,
        default: Date.now()
    },
    postLocation: {
        type: String
    }
});

const Comment = new mongoose.model('Comment', commentSchema);

export default Comment;