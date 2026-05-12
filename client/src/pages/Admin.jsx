import { useEffect, useState } from "react";
import axios from "axios";
import { getEnrollments, exportCSV } from "../services/api";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEntrollments = async () => {
      try {
        const result = await getEnrollments();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };
    fetchEntrollments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage and monitor all enrollments</p>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">Total Enrollments</p>
          <h2 className="text-2xl font-semibold mt-2">{users.length}</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">Latest Entry</p>
          <h2 className="text-sm mt-2">{users[0]?.name || "—"}</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">Data Export</p>
          <button
            onClick={exportCSV}
            className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/10 text-gray-300">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Phone</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.role || "-"}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
