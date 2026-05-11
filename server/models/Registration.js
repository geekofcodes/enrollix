import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: String,
  age: Number,
  role: String,
  experience: String,
}, { timestamps: true });

export default mongoose.model("Registration", registrationSchema);