import express from 'express';
import { createGroup, deleteGroup, getAllGroups, getGroup, getGroups } from '../controllers/groups.js';

const router = express.Router();

// router.get('/', (req, res) => res.send('Group route'))
router.get('/', getAllGroups);
router.get('/creator/:id', getGroups);
router.get('/group/:id', getGroup);
router.post('/create-group', createGroup);
router.delete('/delete-group/:id', deleteGroup);


export default router