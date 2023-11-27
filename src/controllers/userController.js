import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

//@desc Register user
//@route GET /api/users
//@access public
export const registerUser = async (req,res) => {
    try{
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists){
            res.status(400);
            throw new Error("User already exists!");
        }
        //Hash password
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPass
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