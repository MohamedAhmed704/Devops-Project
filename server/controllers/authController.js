import User from "../models/userModel.js";
import Company from "../models/companyModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.js";
import { sendResetPasswordEmail } from "../utils/emailService.js";

// REGISTER SUPER ADMIN + COMPANY (First Setup) - Register First, then OTP
export const registerCompany = async (req, res) => {
  try {
    const { companyName, name, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_EMAIL",
        message: "Please provide a valid email address"
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "WEAK_PASSWORD",
        message: "Password must be at least 6 characters long"
      });
    }

    // Check if user already exists and is verified
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser && existingUser.emailVerified) {
      return res.status(400).json({
        success: false,
        error: "EMAIL_ALREADY_EXISTS",
        message: "Email is already registered and verified"
      });
    }

    // Create company
    const company = await Company.create({ name: companyName });

    // Create user (pending verification)
    let user;
    if (existingUser) {
      // Update existing unverified user
      user = await User.findByIdAndUpdate(
        existingUser._id,
        {
          name,
          password,
          role: "superAdmin",
          company: company._id,
          isActive: false, // Will be activated after OTP verification
          active: false
        },
        { new: true }
      );
    } else {
      // Create new user (pending verification)
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: "superAdmin",
        company: company._id,
        emailVerified: false, // Pending verification
        isActive: false, // Account not active yet
        active: false
      });
    }

    // Generate and send OTP for email verification
    const OTP = await import("../models/otpModel.js");
    const otpCode = OTP.default.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create OTP record
    await OTP.default.create({
      email: email.toLowerCase(),
      otp: otpCode,
      type: "email_verification",
      expiresAt: expiresAt
    });

    // Send OTP via email
    const { sendOTPEmail } = await import("../utils/emailService.js");
    await sendOTPEmail(email, otpCode);

    return res.status(201).json({
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        isActive: user.isActive
      },
      company: {
        id: company._id,
        name: company.name
      }
    });
  } catch (err) {
    console.error("registerCompany error:", err);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Registration failed. Please try again later."
    });
  }
};

// ACTIVATE ACCOUNT AFTER OTP VERIFICATION
export const activateAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "MISSING_FIELDS",
        message: "Email and OTP are required"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_EMAIL",
        message: "Please provide a valid email address"
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User not found"
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        error: "ALREADY_VERIFIED",
        message: "Account is already verified"
      });
    }

    // Verify OTP
    const OTP = await import("../models/otpModel.js");
    const otpRecord = await OTP.default.findValidOTP(email.toLowerCase(), otp, "email_verification");
    
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        error: "INVALID_OTP",
        message: "Invalid or expired OTP"
      });
    }

    // Mark OTP as verified
    await otpRecord.markAsVerified();

    // Activate user account
    user.emailVerified = true;
    user.isActive = true;
    user.active = true;
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      success: true,
      message: "Account activated successfully! You can now login.",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        isActive: user.isActive
      }
    });

  } catch (err) {
    console.error("activateAccount error:", err);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Account activation failed. Please try again later."
    });
  }
};

// LOGIN (Any User: Super Admin, Admin, Employee)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("company");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.active) {
      return res.status(403).json({ message: "User account is inactive" });
    }

    const match = await user.matchPassword(password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.json({
      message: "Logged in successfully",
      accessToken,
      user,
    });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// REFRESH TOKEN → NEW ACCESS TOKEN
export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (!user.active) {
      return res.status(403).json({ message: "User account is inactive" });
    }

    const newAccessToken = generateAccessToken(user);

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("refreshAccessToken error:", err);
    return res.status(401).json({ message: "Refresh token expired or invalid" });
  }
};

// LOGOUT (Clear Refresh Token)
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("logoutUser error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// FORGET PASSWORD - Send Reset Email
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Don't expose if user exists or not
      return res.json({ message: "If the email exists, a reset link has been sent." });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token for security (store hashed)
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token and expiry on user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // Create reset URL (frontend link)
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

    // Send email using service
    await sendResetPasswordEmail(user.email, resetUrl);

    return res.json({ message: "Reset email sent." });
  } catch (err) {
    console.error("forgetPassword error:", err);
    return res.status(500).json({ message: "Email could not be sent." });
  }
};

// RESET PASSWORD - Verify Token and Update Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Hash the incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ message: err.message });
  }
};
