import express from "express";
import { verifyPayment } from "../controllers/paymentController.js";
import { createOrder } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

export default router;
