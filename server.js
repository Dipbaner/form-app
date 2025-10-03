const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 👉 Serve static files (HTML, CSS, JS) from current folder
app.use(express.static(path.join(__dirname)));

// Default route (serve index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST route for sending email
app.post("/send", (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log("📨 Received form data:", req.body);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dipbanerjee553@gmail.com", // 👉 replace with your Gmail
      pass: "nych glls plix mfui", // 👉 16-digit Gmail App Password
    },
  });

  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: "dipbanerjee553@gmail.com", // 👉 your Gmail inbox
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Email sending error:", error);
      return res.status(500).send("Error sending message.");
    }
    console.log("✅ Email sent:", info.response);
    res.status(200).send("Message sent successfully!");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
