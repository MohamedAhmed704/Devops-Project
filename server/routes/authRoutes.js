import express from "express";
import { 
  registerCompany, 
  loginUser, 
  refreshAccessToken, 
  logoutUser,
  forgetPassword,
  resetPassword,
  activateAccount 
} from "../controllers/authController.js";
import {
  getGoogleAuthUrlController,
  googleAuthCallbackController,
  googleSignInController,
  linkGoogleAccountController,
  unlinkGoogleAccountController,
  getGoogleAuthStatusController
} from "../controllers/googleAuthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginUser);
router.get("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Password reset routes (public, no auth required)
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

// Account activation route (public, no auth required)
router.post("/activate", activateAccount);

// Google OAuth routes (public, no auth required)
router.get("/google/url", getGoogleAuthUrlController);
router.get("/google/callback", googleAuthCallbackController);
router.post("/google/signin", googleSignInController);

// Google account management routes (protected)
router.post("/google/link", protect, linkGoogleAccountController);
router.post("/google/unlink", protect, unlinkGoogleAccountController);
router.get("/google/status", protect, getGoogleAuthStatusController);

export default router;
