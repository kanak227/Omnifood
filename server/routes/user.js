const express = require('express');
const {
    signup,
    login,
    getProfile,
    verifyEmail,
    logout
} = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', isAuthenticated, getProfile);
router.get('/verify-email/:verifyToken', verifyEmail);
router.get('/logout', logout);

module.exports = router;