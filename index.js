import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bookRoutes from './src/routes/bookRoute.js';
import userRoutes from './src/routes/userRoute.js';

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Ndeewo');
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});