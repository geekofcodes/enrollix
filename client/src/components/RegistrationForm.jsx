import { useState } from "react";
import axios from "axios";

export default function RegistrationForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        age: "",
        role: "",
        experience: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            await axios.post("http://localhost:5000/api/register", form);

            alert("Registered successfully!");
            setForm({
                name: "",
                phone: "",
                email: "",
                age: "",
                role: "",
                experience: ""
            });

        } catch (err) {
            alert(err.response?.data?.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
            
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Join Our Team 🎭
                </h2>

                {/* Inputs */}
                <div className="space-y-4">
                    {["name", "phone", "email"].map((field) => (
                        <input
                            key={field}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={form[field] || ""}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={field !== "email"}
                        />
                    ))}

                    <input
                        name="age"
                        placeholder="Age"
                        type="number"
                        value={form.age || ""}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
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
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
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
                    {loading ? "Submitting..." : "Register 🚀"}
                </button>
            </form>
        </div>
    );
}