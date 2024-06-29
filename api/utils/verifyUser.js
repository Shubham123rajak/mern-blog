import jwt from 'jsonwebtoken';
import { errorHendler } from './error.js';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHendler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHendler(401, 'unotherized user'))
        }
        req.user = user;
        next();
    })
}

