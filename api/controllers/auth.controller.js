import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';

export const Signup = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: "all field are requred" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    await newUser.save();
    res.json('Signup successful');
}