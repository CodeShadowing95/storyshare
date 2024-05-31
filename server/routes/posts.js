import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, getComments } from '../controllers/posts.js';
// import auth from '../middleware/auth.js';

const router = express.Router();

// router.get('/', (req, res) => res.send('Post route'))

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/create-post', createPost);

router.patch('/update-post/:id', updatePost);

router.delete('/delete-post/:id', deletePost);

router.patch('/post/:id/like', likePost);

router.patch('/post/:id/comment', commentPost);

router.get('/post/:id/comments', getComments);

export default router;