import express from 'express';
import {
    getBooks,
    getBook,
    postBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';
import { validateToken } from '../middleware/validate.js';

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
router.use(validateToken);
router.route('/').get(getBooks).post(postBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

export default router;