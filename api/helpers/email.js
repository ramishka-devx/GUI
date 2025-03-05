const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "mail.alguidance.lk", // Replace with your SMTP server
  port: 465, // Usually 465 for SSL or 587 for TLS
  secure: true, // Use true for 465, false for 587
  auth: {
    user: "no-reply@alguidance.lk", // Your email address
    pass: "oN$MT^c8{W2a", // Your email password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"Kalderama" <no-reply@alguidance.lk>`, // Set sender name
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

// Email Sending Route
router.post("/send-email", async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await sendEmail(
      "ramishkathennakoon@gmail.com",
      `New Contact Form Submission from ${fullName}`,
      `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`
    );
    res.status(200).json({ success: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
