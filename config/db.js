import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () => {
    mongoose.
    connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB');
    }).catch((error) => {
        console.log(error);
    });
};