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
          <div style="font-family: Inter, Arial; background:#f9fafb; padding:30px;">
            <div style="max-width:480px; margin:auto; background:white; border-radius:12px; padding:24px; box-shadow:0 10px 25px rgba(0,0,0,0.05);">
              
              <h2 style="color:#2563eb; margin-bottom:0;">Enrollix 🎉</h2>
              <p style="margin-top:5px; color:#6b7280;">Payment successful</p>

              <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

              <p>Hi <b>${user.name}</b>,</p>
              <p>Your enrollment has been successfully completed.</p>

              <div style="background:#f3f4f6; padding:16px; border-radius:8px; margin:20px 0;">
                <p style="margin:0;"><b>Role:</b> ${user.role}</p>
                <p style="margin:0;"><b>Amount:</b> ₹${user.amount}</p>
                <p style="margin:0;"><b>Payment ID:</b> ${user.paymentId}</p>
              </div>

              <div style="text-align:center; margin-top:20px;">
                <a href="${process.env.FRONTEND_URL}/success"
                  style="background:#2563eb; color:white; padding:10px 20px; border-radius:6px; text-decoration:none;">
                  View Details
                </a>
              </div>

              <p style="margin-top:30px; font-size:12px; color:#9ca3af; text-align:center;">
                Need help? Just reply to this email.
              </p>

            </div>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    console.error("Email error:", err.response?.data || err.message);
  }
};
