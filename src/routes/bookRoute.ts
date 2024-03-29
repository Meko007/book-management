import express from 'express';
import {
	postBook,
	getBooks,
	updateBook,
	deleteBook,
	favouriteBook,
	removeBookFromFavourites,
	addReview,
	deleteReview,
} from '../controllers/bookController';
import { verifyToken, isAdmin, isSuspended } from '../middleware/auth';

const router = express.Router();

router.route('/books')
	.post(verifyToken, isAdmin, postBook)
	.get(verifyToken, isSuspended, getBooks);

router.route('/books/:id')
	.put(verifyToken, isAdmin, updateBook)
	.delete(verifyToken, isAdmin, deleteBook);

router.route('/books/:bookId/favourite')
	.post(verifyToken, isSuspended, favouriteBook)
	.delete(verifyToken, isSuspended, removeBookFromFavourites);

router.route('/books/:bookId/review')
	.post(verifyToken, isSuspended, addReview)
	.delete(verifyToken, isSuspended, deleteReview);

export default router;