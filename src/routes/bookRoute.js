import express from 'express';
import {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';
import { validateToken, restrict } from '../middleware/validate.js';

const router = express.Router();

// router.use(validateToken);
router.route('/').get(getBooks).post(validateToken, postBook);
router.route('/:id')
    .get(validateToken, getBook)
    .put(validateToken, updateBook)
    .delete(validateToken, restrict('admin'), deleteBook);

export default router;