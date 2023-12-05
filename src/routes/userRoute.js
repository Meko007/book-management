import express from 'express';
import {
    registerUser,
    loginUser,
    currentUser
} from '../controllers/userController.js';
import { validateToken } from '../middleware/validate.js';

const router = express.Router();

// router.post('/register-user', registerUser);

// router.post('/login', loginUser);

// router.get('/current', validateToken, currentUser);

// export default router;

// Software admin registration route
router.post('/register/seAdmin', async (req, res) => {
    await registerUser(req.body, 'seAdmin', res);
});

// Admin registration route
router.post('/register/admin', async (req, res) => {
    await registerUser(req.body, 'admin', res);
});

// User registration route
router.post('/register/user', async (req, res) => {
    await registerUser(req.body, 'user', res);
});

// Software admin login route
router.post('/login/seAdmin', async (req, res) => {
    await loginUser(req.body, 'seAdmin', res);
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

export default router;