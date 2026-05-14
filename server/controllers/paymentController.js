import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendConfirmationEmail } from "../services/emailService.js";
import Enrollment from "../models/Enrollment.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 50000, // ₹500 (in paise)
      currency: "INR",
      receipt: "receipt_order_1",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order" });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    phone,
    email,
    age,
    role,
    experience,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      const user = await Enrollment.create({
        name,
        phone,
        email,
        age,
        role,
        experience,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paymentStatus: "Paid",
        amount: 500,
      });

      if (user.email) {
        await sendConfirmationEmail(user);
      }

      res.json({ success: true });
    } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ message: "Error saving enrollment" });
    }
  } else {
    res.status(400).json({ success: false });
  }
};
