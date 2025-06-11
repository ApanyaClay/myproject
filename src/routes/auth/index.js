const express = require('express');
const router = express.Router();
const { validateLogin, redirectIfLoggedIn } = require('../../middlewares/authMiddleware');
const { login, handleLogin, logout } = require('../../controllers/authController');

// Route for user login
router.get('/login', redirectIfLoggedIn, login);
// Route to handle login form submission
router.post('/login', validateLogin, handleLogin);
// Route for user registration
// router.get('/register', redirectIfLoggedIn, register);
// // Route to handle registration form submission
// router.post('/register', handleRegister);
// // Route for forgot password
// router.get('/forgot-password', forgotPassword);
// // Route to handle forgot password form submission
// router.post('/forgot-password', handleForgotPassword);
// // Route for logout
router.get('/logout', logout);
// // Route for user profile
// router.get('/profile', profile);
// // Route to handle profile update
// router.post('/profile', updateProfile);
// // Route for user settings
// router.get('/settings', settings);
// // Route to handle settings update
// router.post('/settings', updateSettings);
// // Route for user verification
// router.get('/verify/:token', verifyEmail);
// // Route for user activation
// router.get('/activate/:token', activateAccount);
// // Route for user password reset
// router.get('/reset-password/:token', resetPassword);
// // Route to handle password reset form submission
// router.post('/reset-password/:token', handleResetPassword);

module.exports = router;