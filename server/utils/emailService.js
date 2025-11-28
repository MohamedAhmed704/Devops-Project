import nodemailer from "nodemailer";

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

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: "Password Reset Request",
            html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link expires in 10 minutes.</p>
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
