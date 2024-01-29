import express from 'express';
import {
	postBook,
	getBooks,
	updateBook,
	deleteBook
} from '../controllers/bookController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.route('/books')
	.post(postBook)
	.get(getBooks);

router.route('/books/:id')
	.put(updateBook)
	.delete(verifyToken, deleteBook);

export default router;