import express from "express";
import {
  createRegistration,
  getAllRegistrations,
  exportCSV,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/register", createRegistration);
router.get("/registrations", getAllRegistrations);
router.get("/export", exportCSV);

export default router;