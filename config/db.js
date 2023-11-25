import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.
    connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB');
    }).catch((error) => {
        console.log(error);
    });
};