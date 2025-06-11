const { loginService } = require('../services/authService');
const { generateRefreshToken } = require('../services/jtwService');

exports.login = async function (req, res) {
  res.render('auth/login', {});
};

exports.handleLogin = async function (req, res) {
  try {
    const { email, password, rememberMe } = req.body;

    // Call the login service
    const user = await loginService(email, password);
    if (!user || user.status !== 'active') {
      // Menyatukan semua kondisi gagal dalam satu blok
      req.flash('error', 'Kredensial salah atau akun Anda tidak aktif.');
      return res.redirect('/login');
    }

    // Set user session
    req.session.user = {
      loggedIn: true,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      status: user.status,
    };
    const refreshToken = await generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    // Logika untuk "Remember Me"
    if (rememberMe) {
      // Simpan refresh token di session
      req.session.user.refreshToken = refreshToken;
      req.session.user.rememberMe = rememberMe;
      // Atur umur sesi menjadi 30 hari
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      req.session.cookie.maxAge = thirtyDays;
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: thirtyDays, // Cookie juga bertahan 30 hari
      });
    } else {
      // Jika tidak dicentang, cookie akan menjadi cookie sesi (hilang saat browser ditutup)
      // atau Anda bisa atur umur default yang lebih pendek
      req.session.cookie.expires = false;
      res.cookie('userId', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    req.flash('success', 'Selamat! Anda berhasil login.');
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    req.flash('error', error.message);
    return res.redirect('/login');
  }
};

exports.logout = async function (req, res) {
  try {
    const successMessage = 'Berhasil logout.';

    req.session.destroy((err) => {
      if (err) {
        console.error('Gagal menghancurkan session:', err);
        res.cookie('flashError', 'Gagal logout. Silakan coba lagi.', { maxAge: 3000 });
        return res.redirect('/');
      }

      res.clearCookie('connect.sid');
      res.clearCookie('refreshToken');
      res.clearCookie('userId');

      // Simpan pesan flash ke cookie sementara
      res.cookie('flashSuccess', successMessage, { maxAge: 3000 });

      return res.redirect('/login');
    });
  } catch (error) {
    console.log(error);
    res.cookie('flashError', 'Terjadi kesalahan saat logout.', { maxAge: 3000 });
    return res.redirect('/');
  }
};
