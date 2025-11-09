import express from "express";
import {
  googleAuthSuccess,
  login,
  logout,
  refreshToken,
  register,
  verifyEmail,
} from "../controller/auth.controller.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthSuccess
);

export default router;
