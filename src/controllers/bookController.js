import Book from '../models/bookModel.js';

//@desc Get all books 
//@route GET /api/books
//@access private
export const getBooks = async (req, res) => {
    try{
        const books = await Book.find({ user_id: req.user.id });
        res.status(200).json(books);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Get Book 
//@route GET /api/books/:id
//@access private
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
//@access private
export const postBook = async (req, res) => {
    try{
        const { title, author, genre, year } = req.body;
        const book = await Book.create({
            title,
            author,
            genre,
            year,
            user_id: req.user.id 
        });
        // const book = await Book.create(req.body);
        res.status(201).json(book);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Update Book 
//@route PUT /api/books/:id
//@access private
export const updateBook = async (req, res) => {
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: `cannot find any book with ID ${id}` });
        }

        if(book.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error(`You can't update someone else's books`);
            
        }
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedBook);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Delete Book 
//@route DELETE /api/books/:id
//@access private
export const deleteBook = async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({ message: `cannot find any book with ID ${id}` })
        }

        if(book.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error(`You can't delete someone else's books`);
            
        }
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};
