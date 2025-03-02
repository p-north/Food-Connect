import express from "express";
import {
  handleLogout,
  verifyEmail,
  handleLogin,
  handleSignUp,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// define routes here for authentication
router.post("/signup", handleSignUp);
router.post("/verify-email", verifyEmail);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/check-auth", verifyToken, checkAuth);

// optional: forgot password, reset password
// router.post("forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

export default router;
