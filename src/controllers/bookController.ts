import { Request, Response } from 'express';
import BookModel, { IBook } from '../models/bookModel';
import UserModel from '../models/userModel';
import { validationResult, check } from 'express-validator';
import { customReq } from '../middleware/auth';
import { JwtPayload } from 'jsonwebtoken';

export const postBook = async (req: Request, res: Response) => {
	try {
		await Promise.all([
			check('title').isString().trim().escape().notEmpty().run(req),
			check('author').isString().trim().escape().notEmpty().run(req),
			check('genre').isArray().trim().escape().notEmpty().run(req),
			check('pubYear').isNumeric().run(req),
			check('bookURL').isString().trim().notEmpty().run(req),
			check('picURL').isString().trim().notEmpty().run(req),
		]);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, author, genre, pubYear, bookURL, picURL } = req.body;
		const titleExists = await BookModel.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });

		if (titleExists) {
			return res.status(409).json({ message: `${title} already exists` });
		}

		const newBook: IBook = await BookModel.create({
			title,
			author,
			genre,
			pubYear,
			bookURL,
			picURL,
			favouritesCount: 0,
			favouritedBy: [],
		});
		res.status(201).json(newBook);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const getBooks = async (req: Request, res: Response) => {
	try {
		const queryObj = { ...req.query };

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

		const books = await BookModel.find(JSON.parse(queryStr), '-favouritedBy -createdAt -updatedAt -__v');
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const updateBook = async (req: Request, res: Response) => {  
	try {
		const { id } = req.params;
		const book = await BookModel.findById(id);

		if (!book) {
			return res.status(404).json({ message: `book with the id ${id} wasn't found` });
		}

		const updatedBook = await BookModel.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedBook);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const deleteBook = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const book = await BookModel.findByIdAndDelete(id);

		if (!book) {
			return res.status(404).json({ message: `book with the id ${id} wasn't found` });
		}
		res.status(200).json({
			message: 'deleted',
			book
		});
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const favouriteBook = async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const userId = ((req as customReq).token as JwtPayload).userId;
		const book = await BookModel.findById(bookId);

		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (book.favouritedBy.includes(userId)) {
			return res.status(409).json({ message: 'You\'ve favourited this book' });
		}

		if (user.favourites.includes(bookId)) {
			return res.status(400).json({ message: 'Book already in favourites' });
		}

		await BookModel.findByIdAndUpdate(book._id, {
			$inc: { 'favouritesCount': 1 }, 
			$push: { 'favouritedBy': userId } 
		}, { new: true });
		await UserModel.findByIdAndUpdate(user._id, { $push: { 'favourites': bookId } }, { new: true });

		res.status(200).json({ message: 'added to your favourites' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const removeBookFromFavourites = async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const userId = ((req as customReq).token as JwtPayload).userId;
		const book = await BookModel.findById(bookId);

		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!book.favouritedBy.includes(userId)) {
			return res.status(409).json({ message: 'You didn\'t favourite this book' });
		}

		if (!user.favourites.includes(bookId)) {
			return res.status(400).json({ message: 'Book not in favourites' });
		}

		await BookModel.findByIdAndUpdate(book._id, {
			$inc: { 'favouritesCount': -1 }, 
			$pull: { 'favouritedBy': userId } 
		});
		await UserModel.findByIdAndUpdate(user._id, { $pull: { 'favourites': bookId } });

		res.status(200).json({ message: 'removed from your favourites' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const addReview = async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const { review } = req.body;
		const userId = ((req as customReq).token as JwtPayload).userId;

		const book = await BookModel.findById(bookId);

		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		await BookModel.findByIdAndUpdate(book._id, { $set: { [`reviews.${userId}`]: review } });
		res.status(200).json({ message: 'Review added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const deleteReview = async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const userId = ((req as customReq).token as JwtPayload).userId;

		const book = await BookModel.findById(bookId);

		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		await BookModel.findByIdAndUpdate(book._id, { $unset: { [`reviews.${userId}`]: 1 } });
		res.status(200).json({ message: 'Review deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};