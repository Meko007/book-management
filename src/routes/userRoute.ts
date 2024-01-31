import express from 'express';
import {
	registerUser,
	loginUser,
	getUsers,
	deleteUser,
	updateUser,
} from '../controllers/userController';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users', verifyToken, isAdmin, getUsers);
router.route('/users/:id')
	.put(verifyToken, isAdmin, updateUser)
	.delete(verifyToken, isAdmin, deleteUser);

export default router;