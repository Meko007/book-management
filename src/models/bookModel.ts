import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string[];
    pubYear: number;
    bookURL: string;
    picURL: string;
	favouritesCount: number;
	favouritedBy: string[];
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
			type: Number,
			required: true,
		},
		bookURL: {
			type: String,
			required: true,
		},
		picURL: {
			type: String,
			required: true,
		},
		favouritesCount: {
			type: Number,
			default: 0,
		},
		favouritedBy:{
			type: [Schema.Types.ObjectId],
			default: [],
		},
	},
	{ timestamps: true }
);

const BookModel = mongoose.model<IBook>('Book', bookSchema);

export default BookModel;