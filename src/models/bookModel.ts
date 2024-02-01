import mongoose, { Document, Schema } from 'mongoose';
import { capitalizeName, sanitizeText1, sanitizeText2 } from '../utils/util';
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
			validate: [sanitizeText2, 'Avoid unnecessary whitespaces'],
		},
		author: {
			type: String,
			required: true,
			validate: [sanitizeText1, 'Avoid unnecessary whitespaces'],
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
			trim: true,
		},
		picURL: {
			type: String,
			required: true,
			trim: true,
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

bookSchema.pre<IBook>('save', async function(next) {
	this.author = capitalizeName(this.author);
	
	for (let i = 0; i < this.genre.length; i++) {
		this.genre[i] = this.genre[i].toLowerCase();
	}

	next();
});

const BookModel = mongoose.model<IBook>('Book', bookSchema);

export default BookModel;