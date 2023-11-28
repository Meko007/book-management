import express from 'express';
import {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';
import { validateToken } from '../middleware/validate.js';

const router = express.Router();

router.use(validateToken);
router.route('/').get(getBooks).post(postBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

export default router;