import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string[];
    pubYear: string;
    price: string;
    picURL: string;
}

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true, 
			unique: true,
		},
		author: {
			type: String,
			required: true,
		},
		genre: {
			type: [String],
			default: [],
			required: true,
		},
		pubYear: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		picURL: {
			type: String,
			required: true,
		}
	}
);

const BookModel = mongoose.model<IBook>('Book', bookSchema);

export default BookModel;