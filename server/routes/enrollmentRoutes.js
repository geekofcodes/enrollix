import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEnrollment,
  getAllEnrollments,
  exportCSV,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/enroll", createEnrollment);
router.get("/enrollments", protect, getAllEnrollments);
router.get("/export", protect, exportCSV);

export default router;