const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { validateLogin, redirectIfLoggedIn } = require('../../middlewares/authMiddleware');

// Route for user login
router.get('/login', redirectIfLoggedIn, authController.login);
// Route to handle login form submission
router.post('/login', validateLogin, authController.handleLogin);
// Route for user registration
// router.get('/register', authController.register);
// // Route to handle registration form submission
// router.post('/register', authController.handleRegister);
// // Route for forgot password
// router.get('/forgot-password', authController.forgotPassword);
// // Route to handle forgot password form submission
// router.post('/forgot-password', authController.handleForgotPassword);
// // Route for logout
// router.get('/logout', authController.logout);
// // Route for user profile
// router.get('/profile', authController.profile);
// // Route to handle profile update
// router.post('/profile', authController.updateProfile);
// // Route for user settings
// router.get('/settings', authController.settings);
// // Route to handle settings update
// router.post('/settings', authController.updateSettings);
// // Route for user verification
// router.get('/verify/:token', authController.verifyEmail);
// // Route for user activation
// router.get('/activate/:token', authController.activateAccount);
// // Route for user password reset
// router.get('/reset-password/:token', authController.resetPassword);
// // Route to handle password reset form submission
// router.post('/reset-password/:token', authController.handleResetPassword);

module.exports = router;