const jwt = require('jsonwebtoken');
const { asyncError } = require('./error.js');
const ErrorHandler = require('../utils/error.js');
const User = require('../models/user.js');

const isAuthenticated = asyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        throw new ErrorHandler("Unauthorized", 401);
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
})

module.exports = {
    isAuthenticated
}
