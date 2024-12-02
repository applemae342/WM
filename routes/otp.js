const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// POST route to send OTP
router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email input
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use your email provider
            auth: {
                user: "jhonryl.martinez@student.passerellesnumeriques.org",
                pass: "09398031440", 
            },
        });

        // Email options
        const mailOptions = {
            from: "jhonryl.martinez@student.passerellesnumeriques.org",
            to: email,
            subject: "YOUR OTP",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success (Don't return the OTP in production)
        res.status(200).json({ message: "OTP sent successfully", otp }); // Remove `otp` in production
    } catch (error) {
        console.error("Error sending OTP:", error.message);

        // Handle Nodemailer errors
        if (error.response) {
            return res.status(500).json({ message: `Email error: ${error.response}` });
        }

        res.status(500).json({ message: "Failed to send OTP. Please try again later." });
    }
});

module.exports = router;
