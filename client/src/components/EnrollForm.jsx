import { useState } from "react";
import { enrollUser } from "../services/api";
import toast from "react-hot-toast";

export default function EnrollForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    role: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 Validation
  const validate = () => {
    if (!form.name.trim()) return "Full name is required";
    if (!form.phone.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(form.phone))
      return "Phone must be exactly 10 digits";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      await enrollUser({
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
      });

      toast.success("🎉 Enrolled successfully!");

      setForm({
        name: "",
        phone: "",
        email: "",
        age: "",
        role: "",
        experience: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
      >
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Enrollix
          </h1>

          <p className="text-sm text-gray-300 mt-2">
            Smart enrollments made simple
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Role</option>
            <option>Dancer</option>
            <option>Singer</option>
            <option>Musician</option>
          </select>

          <textarea
            name="experience"
            placeholder="Your Experience..."
            value={form.experience}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {loading ? "Submitting..." : "Enroll 🚀"}
        </button>
      </form>
    </div>
  );
}
