import express from 'express';

import { getUsers, signin, signup } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', getUsers);

export default router;