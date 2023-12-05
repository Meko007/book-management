import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc Register user
//@route POST /api/users/register
//@access public
export const registerUser = async (req, role, res) => {
    try{
        const { username, email, password, confirmPassword } = req;
        const userExists = await User.findOne({ email });
        if(userExists) throw new Error('User already exists');

        const usernameTaken = await User.findOne({ username });
        if(usernameTaken) throw new Error('Username taken');
    
        const user = await User.create({
            username,
            email,
            password,
            confirmPassword,
            role
        });
        res.status(201).json({
            userId: user._id,
            username: user.username, 
            email: user.email,
            role: user.role
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = async (req, role, res) => {
    try{
        const { email, password } = req;
        const user = await User.findOne({ email });
        if(user.role !== role){
            return res.status(403).json(
                { message: `Make sure you're logging in from the right portal` }
            );
        }
        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    id: user.id
                },
            }, process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
            res.status(200).json({
                username: user.username,
                email: user.email,
                role: user.role,
                accessToken,    
                message: `You're now logged in`
            });
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