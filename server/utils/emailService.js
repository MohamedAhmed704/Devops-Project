import nodemailer from "nodemailer";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Send reset password email
export const sendResetPasswordEmail = async (email, resetUrl) => {
    try {
        const transporter = createTransporter();
        const logoPath = path.join(__dirname, '..', 'assets', 'logo.png')
        const logoExists = fs.existsSync(logoPath)

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: "Password Reset Request - Tadber Shift Planner",
            attachments: logoExists ? [
                {
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'tadber-logo'
                }
            ] : [],
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9F7F7;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #DBE2EF; border-radius: 10px; overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #19283a; padding: 20px; text-align: center;">
            <img src="${logoExists ? 'cid:tadber-logo' : ''}" alt="Tadber Logo" style="max-width: 150px; height: auto;" />
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
            <h1 style="color: #112D4E; font-size: 24px; margin-bottom: 15px; text-align: center; font-weight: bold;">
                Password Reset Request
            </h1>

            <p style="color: #3F72AF; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
                We received a request to reset your password for your <strong>Tadber Shift Planner</strong> account.
            </p>

            <p style="color: #112D4E; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                If you made this request, click the button below to reset your password:
            </p>

            <!-- Reset Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #19283a; color: #ffffff; padding: 12px 30px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block; transition: background-color 0.3s;">
                    Reset Password
                </a>
            </div>

            <p style="color: #112D4E; font-size: 14px; line-height: 1.6;">
                This link will expire in <strong>10 minutes</strong> for security reasons. If you didn't request this reset, please ignore this email.
            </p>

            <p style="color: #3F72AF; font-size: 14px; margin-top: 30px; text-align: center;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #3F72AF; word-break: break-all;">${resetUrl}</a>
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #F9F7F7; padding: 20px; text-align: center; border-top: 1px solid #DBE2EF;">
            <p style="color: #112D4E; font-size: 14px; margin: 0;">
                © 2025 Tadber Shift Planner. All rights reserved.
            </p>
            <p style="color: #3F72AF; font-size: 12px; margin: 5px 0 0 0;">
                This is an automated email, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Reset email sent to:", email);
        return info;
    } catch (err) {
        console.error("emailService error:", err);
        throw err;
    }
};

// Send OTP verification email
export const sendOTPEmail = async (email, otpCode) => {
    try {
        const transporter = createTransporter();
        const logoPath = path.join(__dirname, '..', 'assets', 'logo.png')
        const logoExists = fs.existsSync(logoPath)

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: "Email Verification - Tadber Shift Planner",
            attachments: logoExists ? [
                {
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'tadber-logo'
                }
            ] : [],
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9F7F7;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #DBE2EF; border-radius: 10px; overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #19283a; padding: 20px; text-align: center;">
            <img src="${logoExists ? 'cid:tadber-logo' : ''}" alt="Tadber Logo" style="max-width: 150px; height: auto;" />
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
            <h1 style="color: #112D4E; font-size: 24px; margin-bottom: 15px; text-align: center; font-weight: bold;">
                Verify Your Email Address
            </h1>

            <p style="color: #3F72AF; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
                Thank you for signing up for <strong>Tadber Shift Planner</strong>!
            </p>

            <p style="color: #112D4E; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                To complete your registration, please use the following verification code:
            </p>

            <!-- OTP Code Display -->
            <div style="background-color: #F0F4F8; border: 2px dashed #3F72AF; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                <div style="font-size: 32px; font-weight: bold; color: #112D4E; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                    ${otpCode}
                </div>
            </div>

            <p style="color: #112D4E; font-size: 14px; line-height: 1.6;">
                This code will expire in <strong>10 minutes</strong> for security reasons. If you didn't request this verification, please ignore this email.
            </p>

            <p style="color: #3F72AF; font-size: 14px; margin-top: 30px; text-align: center;">
                If you have trouble entering the code, you can request a new one from the verification page.
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #F9F7F7; padding: 20px; text-align: center; border-top: 1px solid #DBE2EF;">
            <p style="color: #112D4E; font-size: 14px; margin: 0;">
                © 2025 Tadber Shift Planner. All rights reserved.
            </p>
            <p style="color: #3F72AF; font-size: 12px; margin: 5px 0 0 0;">
                This is an automated email, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent to:", email);
        return info;
    } catch (err) {
        console.error("sendOTPEmail error:", err);
        throw err;
    }
};

