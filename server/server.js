import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiter (spam protection)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, try again later",
});

app.use("/api/enroll", limiter);

// Routes
app.use("/api", enrollmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
// DB
connectDB();

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
