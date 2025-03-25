const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

const { errorMiddleware } = require('./middlewares/error.js');
const authRouter = require('./routes/user.js');
const csurf = require('csurf');

dotenv.config();

const app = express();

// Connect to the database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// handle cors policy
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const csrfProtection = csurf({
    cookie: {
        httpOnly: true,
        secure:false,
        sameSite: "Strict"
    }
})
app.use(csrfProtection);

// CSRF Route 
app.get('/api/csrf-token' , (req, res)=>{
    if(!req.csrfToken) return res.status(500).json({message: 'CSRF Token not generated'});
    res.status(200).json({csrfToken: req.csrfToken() });
});

// auth routes
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// Error middleware
app.use(errorMiddleware);