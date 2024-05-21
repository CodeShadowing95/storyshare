import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
// import auth from '../middleware/auth.js';

/* This creates a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

/* `router.get('/', getPosts);` is defining a route for handling HTTP GET requests to the root URL path
('/'). When a GET request is made to this path, the `getPosts` function from the `posts.js`
controller will be executed to handle the request and send a response. */
router.get('/', getPosts);

router.get('/:id', getPost);

/* `router.post('/', createPost);` is defining a route for handling HTTP POST requests to the root URL
path ('/'). When a POST request is made to this path, the `createPost` function from the `posts.js`
controller will be executed to handle the request and send a response. This route is typically used
for creating new resources on the server. */
// router.post('/', auth, createPost);
router.post('/create-post', createPost);

/* `router.patch('/:id', updatePost);` is defining a route for handling HTTP PATCH requests to a
specific URL path that includes an `id` parameter. When a PATCH request is made to this path, the
`updatePost` function from the `posts.js` controller will be executed to handle the request and send
a response. This route is typically used for updating an existing resource on the server. The `id`
parameter in the URL path allows the server to identify which resource to update. */
// router.patch('/:id', auth, updatePost);
router.patch('/:id', updatePost);

/* `router.delete('/:id', deletePost);` is defining a route for handling HTTP DELETE requests to a
specific URL path that includes an `id` parameter. When a DELETE request is made to this path, the
`deletePost` function from the `posts.js` controller will be executed to handle the request and send
a response. This route is typically used for deleting an existing resource on the server. The `id`
parameter in the URL path allows the server to identify which resource to delete. */
// router.delete('/:id', auth, deletePost);
router.delete('/:id', deletePost);

/* `router.patch('/:id/likePost', likePost);` is defining a route for handling HTTP PATCH requests to a
specific URL path that includes an `id` parameter and the string "likePost". When a PATCH request is
made to this path, the `likePost` function from the `posts.js` controller will be executed to handle
the request and send a response. This route is typically used for updating the "like" count of an
existing resource on the server. The `id` parameter in the URL path allows the server to identify
which resource to update. */
// router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/likePost', likePost);

export default router;