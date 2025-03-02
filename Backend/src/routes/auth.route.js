import express from "express";
import {
  handleLogout,
  verifyEmail,
  handleLogin,
  handleSignUp,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

// define routes here for authentication
router.get("/check-auth", checkAuth);
router.post("/signup", handleSignUp);
router.post("/verify-email", verifyEmail);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

// optional: forgot password, reset password
router.post("forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
