import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendConfirmationEmail = async (user) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Enrollix",
          email: "madhureddy2019cse@gmail.com",
        },
        to: [
          {
            email: user.email,
          },
        ],
        subject: "🎉 Enrollment Confirmed - Enrollix",
        htmlContent: `
          <h2>Enrollment Successful 🎉</h2>
          <p>Hi ${user.name},</p>
          <p>Your registration is confirmed.</p>

          <p><strong>Role:</strong> ${user.role || "-"}</p>
          <p><strong>Payment ID:</strong> ${user.paymentId}</p>

          <br/>
          <p>Thank you for joining Enrollix 🚀</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Email error:", err.response?.data || err.message);
  }
};