const bcrypt = require('bcryptjs');
const { User } = require('../databases/models'); // Adjust the path as necessary

exports.loginService = async function (email, password) {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email }, include: ['role'] });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Return user data without password
    const { password: _, ...userData } = user.toJSON();
    return userData;
  } catch (error) {
    throw error;
  }
}

exports.findUserById = async function (userId) {
  try {
    // Find user by ID
    const user = await User.findByPk(userId, { include: ['role'] });
    if (!user) {
      throw new Error('User not found');
    }

    // Return user data without password
    const { password: _, ...userData } = user.toJSON();
    return userData;
  } catch (error) {
    throw error;
  }
}