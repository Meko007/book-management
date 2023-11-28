import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: [true, "Please enter a book name"]
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;