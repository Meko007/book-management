import express from 'express';
import { bookModel } from '../models/bookModel.js'; 
import { nanoid } from 'nanoid';

const router = express.Router();

router.post("/books", async (req, res) => {
    const book = new bookModel(req.body);
    try{
        await book.save();
        res.send(book);
    }catch(err){
        response.status(500).send(err);
    }
});