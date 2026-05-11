import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  exportCSV,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/enroll", createEnrollment);
router.get("/enrollments", getAllEnrollments);
router.get("/export", exportCSV);

export default router;