import { Token } from "../model/token.model.js";
import { User } from "../model/user.model.js";
import {
  generateAccessToken,
  generateEmailToken,
  generateRefreshToken,
} from "../utils/genrateTokens.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";


// ============================
// REGISTER
// ============================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const emailVerifyToken = generateEmailToken(user);

    const url = `${process.env.CLIENT_URL}/verify-email?token=${emailVerifyToken}`;
    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `Click <a href="${url}">here</a> to verify your email.`,
    });

    res.status(201).json({ message: "Please verify your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ============================
// VERIFY EMAIL
// ============================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Missing token" });

    const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(400).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};


// ============================
// LOGIN
// ============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(400).json({ message: "Please verify your email" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // save refresh token
    await Token.create({ user: user._id, token: refreshToken });

    // Set HttpOnly cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ============================
// REFRESH TOKEN
// ============================
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(403).json({ message: "Missing token" });

    const found = await Token.findOne({ token });
    if (!found)
      return res.status(403).json({ message: "Invalid or expired token" });
    
    // verify refresh token
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate new access token
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) await Token.deleteOne({ token });
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const googleAuthSuccess = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await Token.create({ user: user._id, token: refreshToken });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?accessToken=${accessToken}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};