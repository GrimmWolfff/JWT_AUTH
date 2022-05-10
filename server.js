import 'dotenv/config';
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import userRouter from './routes/auth.js';
import postsRouter from './routes/events.js';

app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api/posts', postsRouter);

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, () => {
    console.log('Connected to the database');
});
app.listen(process.env.PORT, () => {
    console.log(`Server has successfully been started at ${process.env.PORT}`)
})