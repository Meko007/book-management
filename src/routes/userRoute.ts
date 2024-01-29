import express from 'express';
import {
	registerUser,
	loginUser,
	getUsers,
} from '../controllers/userController';

const router = express.Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users', getUsers);


export default router;