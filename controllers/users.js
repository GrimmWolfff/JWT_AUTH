import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json("Invalid Credentials");
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json('Your password is incorrect');
        }
        const payload = { user: { _id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if(user) return res.status(400).json('User already exists');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ username, password: hashedPassword })
        const newUser = await user.save();
        const payload = { user: { _id: newUser._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({token});
    } catch (error) {
        res.status(500).json({ error });
    }
}