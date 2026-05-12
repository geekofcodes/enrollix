import { useState } from "react";
import { loginAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAdmin(form);
      toast.success("Login successful");
      navigate("/admin");

    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-xl border border-white/20 w-[350px]"
      >
        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-white/10"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-white/10"
        />

        <button className="w-full bg-blue-600 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}