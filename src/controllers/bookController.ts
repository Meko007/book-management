import { Request, Response } from 'express';
import BookModel, { IBook } from '../models/bookModel';

export const postBook = async (req: Request, res: Response) => {
	try {
		const { title, author, genre, pubYear, price, picURL } = req.body;
		const titleExists = await BookModel.findOne({ title: { $regex: new RegExp(title, 'i') } });

		if (titleExists) {
			return res.status(409).json({ message: `${title} already exists` });
		}

		const newBook: IBook = await BookModel.create({
			title,
			author,
			genre,
			pubYear,
			price,
			picURL
		});
		res.status(201).json(newBook);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const getBooks = async (req: Request, res: Response) => {
	try {
		const books = await BookModel.find(req.query, '-_id -createdAt -updatedAt -__v');
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