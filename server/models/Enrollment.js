import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: String,
    age: Number,
    role: String,
    experience: String,

    paymentId: String,
    orderId: String,
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    amount: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Enrollments", enrollmentSchema);
