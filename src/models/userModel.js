import mongoose from 'mongoose';

const userSchema = mongoose.schema(
    {
        username: {
            type: String,
            required: [true, "Please add a username"]
        },
        email: {
            type: String,
            required: [true, "Please add an email address"],
            unique: [true, "Email address already used"]
        },
        password: {
            type: String,
            required: [true, "Please add a password"]
        } 
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;