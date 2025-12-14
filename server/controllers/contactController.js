import Message from "../models/messageModel.js";
import { sendContactFormEmail } from "../utils/emailService.js";

// Submit Contact Form
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate Input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: "MISSING_FIELDS",
                message: "Please fill in all required fields (Name, Email, Message)",
            });
        }

        // Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: "INVALID_EMAIL",
                message: "Please provide a valid email address",
            });
        }

        // Save Message to Database
        const newMessage = await Message.create({
            name,
            email,
            phone,
            message,
        });

        // Send Email Notification to Admin (Non-blocking)
        sendContactFormEmail({ name, email, phone, message }).catch((err) =>
            console.error("Failed to send contact notification email:", err)
        );

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        console.error("submitContactForm error:", error);
        return res.status(500).json({
            success: false,
            error: "SERVER_ERROR",
            message: "Failed to send message. Please try again later.",
        });
    }
};
