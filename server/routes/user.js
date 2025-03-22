const express = require('express');
const {
    signup,
    login,
    getProfile,
    verifyEmail
} = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', isAuthenticated, getProfile);
router.get('/verify-email/:verifyToken', verifyEmail);

module.exports = router;