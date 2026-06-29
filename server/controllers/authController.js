import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { sendResetPasswordEmail, sendOTPEmail } from "../utils/emailService.js";

/* =========================
   REGISTER SUPER ADMIN
========================= */
export const registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    if (!email || !password || !companyName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const Company = (await import("../models/companyModel.js")).default;
    const Plan = (await import("../models/planModel.js")).default;

    const freePlan = await Plan.findOne({ price: 0 });

    const company = await Company.create({
      name: companyName.trim(),
      subscription: freePlan
        ? {
            plan: freePlan._id,
            plan_name: freePlan.name,
            maxBranches: freePlan.limits.max_branches,
            maxUsers: freePlan.limits.max_employees,
          }
        : undefined,
    });

    const superAdmin = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: "super_admin",
      company: company._id,
      is_active: false,
      email_verified: false,
    });

    const otpCode = OTP.generateOTP();

    await OTP.create({
      email: normalizedEmail,
      otp: otpCode,
      type: "email_verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOTPEmail(normalizedEmail, otpCode, "email_verification");

    return res.status(201).json({
      success: true,
      message: "Check your email for verification code",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   VERIFY EMAIL (OTP)
========================= */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpRecord = await OTP.findValidOTP(
      normalizedEmail,
      otp,
      "email_verification"
    );

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await otpRecord.markAsVerified();

    user.email_verified = true;
    user.is_active = true;
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
        email_verified: user.email_verified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Verification failed" });
  }
};

/* =========================
   LOGIN
========================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role === "super_admin" && !user.email_verified) {
      return res.status(403).json({
        message: "Email not verified",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "Account inactive",
      });
    }

    const match = await user.matchPassword(password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await user.updateLastLogin();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
        email_verified: user.email_verified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login error" });
  }
};

/* =========================
   RESEND OTP
========================= */
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = OTP.generateOTP();

    await OTP.create({
      email: normalizedEmail,
      otp: otpCode,
      type: "email_verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOTPEmail(normalizedEmail, otpCode, "email_verification");

    return res.json({ message: "OTP sent" });
  } catch (err) {
    return res.status(500).json({ message: "Error sending OTP" });
  }
};
