import express from 'express';
import {
    registerUser,
    loginUser,
    currentUser,
    getUsers,
    deleteUser
} from '../controllers/userController.js';
import { validateToken, restrict } from '../middleware/validate.js';

const router = express.Router();

// Admin registration route
router.post('/register/admin', async (req, res) => {
    await registerUser(req.body, 'admin', res);
});

// User registration route
router.post('/register/user', async (req, res) => {
    await registerUser(req.body, 'user', res);
});

// Admin login route
router.post('/login/admin', async (req, res) => {
    await loginUser(req.body, 'admin', res);
});

// User login route
router.post('/login/user', async (req, res) => {
    await loginUser(req.body, 'user', res);
});

router.get('/current', validateToken, currentUser);

router.get('/', validateToken, restrict('admin'), getUsers);

router.delete('/:id', validateToken, restrict('admin'), deleteUser);

export default router;