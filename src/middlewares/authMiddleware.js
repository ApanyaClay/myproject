const { findUserById } = require('../services/authService');
const { verifyRefreshToken } = require('../services/jtwService');

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    req.flash('error', 'Email atau password tidak boleh kosong.');
    return res.redirect('/login');
  }
  // Proceed to the next middleware or route handler
  next();
};

exports.validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password || !confirmPassword) {
    console.log('All fields are required');
    return res.redirect('/register');
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    return res.redirect('/register');
  }

  // Proceed to the next middleware or route handler
  next();
};

exports.validateForgotPassword = (req, res, next) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    console.log('Email is required for password reset');
    return res.redirect('/forgot-password');
  }

  // Proceed to the next middleware or route handler
  next();
};

exports.validateResetPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  // Check if passwords are provided
  if (!password || !confirmPassword) {
    console.log('Both password fields are required');
    return res.redirect(`/reset-password/${req.params.token}`);
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    return res.redirect(`/reset-password/${req.params.token}`);
  }

  // Proceed to the next middleware or route handler
  next();
};

exports.restoreSession = async function (req, res, next) {
  // Check if user is logged in
  if (req.session && req.session.user && req.session.user.loggedIn) {
    // User is logged in, proceed to the next middleware or route handler
    return next();
  }

  const token = req.cookies.refreshToken;
  // res.clearCookie('refreshToken');
  if (!token) return next();
  try {
    const payload = await verifyRefreshToken(token);

    const user = await findUserById(payload.userId);
    if (user) {
      // User found, restore session
      req.session.user = {
        loggedIn: true,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        status: user.status,
      };
      return next();
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('Refresh token telah kadaluarsa.');
    } else {
      console.log('Refresh token tidak valid:', error.message);
    }
    res.clearCookie('refreshToken');
    
    return res.redirect('/login');
  }
};

exports.redirectIfLoggedIn = (req, res, next) => {
  if (req.session?.user?.loggedIn) {
    return res.redirect('/'); // Ganti '/' ke halaman tujuan jika perlu
  }
  next();
};

exports.requireLogin = (req, res, next) => {
  if (req.session?.user?.loggedIn) {
    return next(); // User sudah login, lanjut ke route berikutnya
  }

  req.flash('error', 'Silakan login terlebih dahulu.');
  return res.redirect('/login');
};
