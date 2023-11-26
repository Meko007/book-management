import mongoose from 'mongoose';
// import nanoid from 'nanoid';

// const _id = nanoid(10);
const bookSchema = new mongoose.Schema(
    {
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

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel ;