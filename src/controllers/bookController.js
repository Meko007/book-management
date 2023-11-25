//@desc Get all books 
//@route GET /api/books
//@access public
const getBooks = async (req,res) => {
    res.status(200).json({message: "Get all books"});
};

//@desc Create new Book 
//@route POST /api/books
//@access public
const createBook = asyncHandler(async (req,res) => {
    console.log("The request body is", req.body);
    const {name, phone} = req.body;
    if(!name || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    res.status(201).json({message: "Create Book"});
});

//@desc Get Book 
//@route GET /api/books/:id
//@access public
const getBook = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Get Book for ${req.params.id}`});
});

//@desc Update Book 
//@route PUT /api/books
//@access public
const updateBook = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Update Book for ${req.params.id}`});
});

//@desc Delete Book 
//@route DELETE /api/books
//@access public
const deleteBook = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Delete Book for ${req.params.id}`});
});

module.exports = { 
    getbooks,
    createBook, 
    getBook, 
    updateBook, 
    deleteBook 
};