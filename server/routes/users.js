import express from 'express';

import { getUsers, signin, signup } from '../controllers/users.js';

const router = express.Router();

// router.get('/', (req, res) => res.send('User route'))
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', getUsers);

export default router;