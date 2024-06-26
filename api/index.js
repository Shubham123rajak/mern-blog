import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    // socketTimeoutMS: 45000,
}).then(() => {
    console.log('MongoDb is connected');
}).catch((err) => {
    console.log(err);
});
const app = express();

app.use(express.json());
app.listen(3000, () => {
    console.log('server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Eror';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})