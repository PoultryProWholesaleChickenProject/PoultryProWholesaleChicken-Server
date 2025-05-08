import nodemailer from "nodemailer";
import { config } from "../env";

const sendEmail = async (toMail: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.MAIL_ID,
      pass: config.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"PoultryPro Wholesale Chicken Support Team" <${config.MAIL_ID}>`,
    to: toMail,
    subject: "Reset Your Password",
    text: "Click the reset link below", // Fallback text for non-HTML clients
    html: `
      <div style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif;">
          <div style="padding: 20px;">
            <h2 style="color: #333333; text-align: center;">Password Reset Request</h2>
            <p style="color: #555555;">Hello,</p>
            <p style="color: #555555;">You recently requested to reset your password. Click the button below to proceed:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}"
                style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p style="color: #777777;">If you didn’t request this, you can safely ignore this email.</p>
            <p style="color: #999999; font-size: 12px; margin-top: 30px;">This link will expire in 15 minutes for your security.</p>
          </div>
          <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 12px; color: #888888;">
            © 2025 PoultryPro. All rights reserved.
          </div>
        </div>
      </div>
    `,
  });
};

export default sendEmail;
