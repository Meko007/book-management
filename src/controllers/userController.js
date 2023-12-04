import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc Register user
//@route POST /api/users/register
//@access public
export const registerUser = async (req, res) => {
    try{
        const { username, email, password, confirmPassword } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists){
            res.status(400);
            throw new Error("User already exists!");
        }
        //Hash password
        // const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password,
            confirmPassword
        });
        res.status(201).json({
            userId: user._id,
            username: user.username, 
            email: user.email 
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            }, process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
            res.status(200).json({ accessToken });
        }else{
            res.status(401);
            throw new Error('Email or password is invalid');
        }
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Current user info
//@route GET /api/users
//@access public
export const currentUser = async (req, res) => {
    try{
        res.json(req.user);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};