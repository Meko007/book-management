import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './src/routes/books.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", router);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Ndeewo');
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})