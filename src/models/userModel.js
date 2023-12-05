import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail } from '../middleware/validate.js';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a username"],
            unique: [true, "Username is taken"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please add an email address"],
            unique: [true, "Email address already used"],
            trim: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minLength: 8,
            maxLength: 1024
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (val) {
                    return val === this.password 
                },
                message: `Passwords don't match!`
            }
        },
        role: {
            type: String,
            enum: ["user", "admin", "seAdmin"]
        } 
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next(); 

    this.password = await bcrypt.hash(this.password, 10);

    this.confirmPassword = undefined;
    next();
});


const User = mongoose.model('User', userSchema);

export default User;