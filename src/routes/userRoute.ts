import express from 'express';
import {
	registerUser,
	loginUser,
	getUsers,
	deleteUser,
	updateUser,
	logoutUser,
	forgotPassword,
	resetPassword,
} from '../controllers/userController';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.post('/users/logout', logoutUser);
router.get('/users', verifyToken, isAdmin, getUsers);
router.post('/users/forgot-password', forgotPassword);
router.post('/users/reset-password', resetPassword);
router.route('/users/:id')
	.put(verifyToken, isAdmin, updateUser)
	.delete(verifyToken, isAdmin, deleteUser);

export default router;