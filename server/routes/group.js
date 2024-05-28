import express from 'express';
import { createGroup, deleteGroup, getAllGroups, getAllPublicGroups, getGroup, getGroups, updateGroup } from '../controllers/groups.js';

const router = express.Router();

// router.get('/', (req, res) => res.send('Group route'))
router.get('/', getAllGroups);
router.get('/public', getAllPublicGroups);
router.get('/creator/:id', getGroups);
router.get('/group/:id', getGroup);
router.post('/create-group', createGroup);
router.patch('/update-group/:id', updateGroup);
router.delete('/delete-group/:id', deleteGroup);


export default router