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
	viewFavourites,
} from '../controllers/userController';
import { verifyToken, isAdmin, isSuspended } from '../middleware/auth';

const router = express.Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.post('/users/logout', verifyToken, logoutUser);
router.get('/users', verifyToken, isAdmin, getUsers);
router.post('/users/forgot-password', forgotPassword);
router.post('/users/reset-password', resetPassword);
router.get('/users/view-favourites', verifyToken, isSuspended, viewFavourites);
router.route('/users/:id')
	.put(verifyToken, isAdmin, updateUser)
	.delete(verifyToken, isAdmin, deleteUser);

export default router;