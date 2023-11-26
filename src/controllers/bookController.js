import bookModel from '../models/bookModel.js';
// import { nanoid } from 'nanoid';
//@desc Get all books 
//@route GET /api/books
//@access public
export const getBooks = async (req,res) => {
    try{
        const books = await bookModel.find({});
        res.status(200).json(books);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};


//@desc Get Book 
//@route GET /api/books/:id
//@access public
export const getBook = async (req,res) => {
    try{
        const { id } = req.params;
        const book = await bookModel.findById(id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({ message: error.message });
    }
};

//@desc Create new Book 
//@route POST /api/books
//@access public
export const postBook = async (req,res) => {
    try{
        const book = await bookModel.create(req.body);
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({ message: error.message });
    }
};


//@desc Update Book 
//@route PUT /api/books
//@access public
export const updateBook = async (req,res) => {
    try{
        const { id } = req.params;
        const book = await bookModel.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({ message: `cannot find any book with ID ${id}` });
        }
        const updatedBook = await bookModel.findById(id);
        res.status(200).json(updatedBook);
    }catch(err){
        res.status(500).json({ message: error.message });
    }
};

//@desc Delete Book 
//@route DELETE /api/books
//@access public
export const deleteBook = async (req,res) => {
    try{
        const { id } = req.params;
        const book = await bookModel.findByIdAndDelete(id);
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({ message: error.message });
    }
};

// module.exports = { 
//     getBooks,
//     postBook, 
//     getBook, 
//     updateBook, 
//     deleteBook 
// };