const jwt = require('jsonwebtoken');

exports.generateToken = async function (payload, expire) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expire || process.env.JWT_EXPIRES_IN
    });
}

exports.verifyToken = async function (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

exports.generateRefreshToken = async function (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
    });
}

exports.verifyRefreshToken = async function (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}