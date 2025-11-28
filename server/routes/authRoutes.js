import express from "express";
import {
  registerCompany,
  loginUser,
  refreshAccessToken,
  logoutUser,
  forgetPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginUser);
router.get("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Password reset routes (public, no auth required)
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
