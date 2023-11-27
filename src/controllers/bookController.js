import Book from '../models/bookModel.js';

//@desc Get all books 
//@route GET /api/books
//@access public
export const getBooks = async (req,res) => {
    try{
        const books = await Book.find({});
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
        const book = await Book.findById(id);
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Create new Book 
//@route POST /api/books
//@access public
export const postBook = async (req,res) => {
    try{
        const book = await Book.create(req.body);
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Update Book 
//@route PUT /api/books/:id
//@access public
export const updateBook = async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if(!book){
            return res.status(404).json({ message: `cannot find any book with ID ${id}` });
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Delete Book 
//@route DELETE /api/books/:id
//@access public
export const deleteBook = async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({ message: `cannot find any book with ID ${id}` })
        }
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};
