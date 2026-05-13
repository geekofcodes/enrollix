import Enrollment from "../models/Enrollment.js";
import { Parser } from "json2csv";

// CREATE
export const createEnrollment = async (req, res) => {
  try {
    const { name, phone, role, paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: "Payment required" });
    }

    const enrollment = await Enrollment.create({
      name,
      phone,
      role,
      paymentId,
    });

    res.json(enrollment);

  } catch (err) {
    res.status(500).json({ message: "Error saving enrollment" });
  }
};

// GET ALL
export const getAllEnrollments = async (req, res) => {
  try {
    const users = await Enrollment.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPORT CSV
export const exportCSV = async (req, res) => {
  try {
    const users = await Enrollment.find();

    const fields = ["name", "phone", "email", "role", "createdAt"];
    const parser = new Parser({ fields });

    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("enrollments.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};