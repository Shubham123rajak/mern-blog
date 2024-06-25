import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHendler } from "../utils/error.js";

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
}