import express from "express";
import { createOrder, verifyPayment, downloadReceipt } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/receipt/:paymentId", downloadReceipt);

export default router;
