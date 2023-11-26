import express from 'express';
import bookModel from '../models/bookModel.js'; 
// import { nanoid } from 'nanoid';
import {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';

const router = express.Router();

// export default router.post("/", async (req, res) => {
//     const book = new bookModel(req.body);
//     try{
//         await book.save();
//         res.send(book);
//     }catch(err){
//         response.status(500).send(err);
//     }
// });

router.route('/').get(getBooks).post(postBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

export default router;