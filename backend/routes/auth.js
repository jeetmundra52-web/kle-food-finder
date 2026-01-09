const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
router.get('/user', auth, (req, res) => {
    res.json(req.user);
});

// @route   POST api/auth/verify-user
// @desc    Verify USN exists
// @access  Public
router.post('/verify-user', authController.verifyUser);

// @route   POST api/auth/reset-password-data
// @desc    Reset password directly
// @access  Public
router.post('/reset-password-data', authController.resetPasswordData);

module.exports = router;
