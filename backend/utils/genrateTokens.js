import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m' });

export const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const generateEmailToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1d' });

export const generateResetToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });
