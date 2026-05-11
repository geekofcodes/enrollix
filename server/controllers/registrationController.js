import Registration from "../models/Registration.js";
import { Parser } from "json2csv";

// CREATE
export const createRegistration = async (req, res) => {
  try {
    const user = await Registration.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Phone already registered" });
    }
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAllRegistrations = async (req, res) => {
  try {
    const users = await Registration.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPORT CSV
export const exportCSV = async (req, res) => {
  try {
    const users = await Registration.find();

    const fields = ["name", "phone", "email", "role", "createdAt"];
    const parser = new Parser({ fields });

    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("registrations.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};