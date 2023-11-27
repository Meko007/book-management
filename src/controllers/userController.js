import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

//@desc Register user
//@route GET /api/users
//@access public
export const registerUser = async (req,res) => {
    try{
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if(user){
            res.status(400);
            throw new Error("User already exists!")
        }

        //Hash password
        const hasedPass = await bcrypt.hash(password, 10);
        res.status(200).json({ username, email, password });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};