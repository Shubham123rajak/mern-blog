import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHendler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const Signup = async (req, res, next) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHendler(400, 'all fields are required'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        console.log("hello");
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHendler(400, 'All field are required'));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHendler(400, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHendler(400, 'Invalid password'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(validUser);
    } catch (error) {
        next(error);
    }
}