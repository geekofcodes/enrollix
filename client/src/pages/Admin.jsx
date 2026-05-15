import { useEffect, useState } from "react";
import { getEnrollments } from "../services/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { exportCSV } from "../services/api";
import {
  BarChart,
  Bar,
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntrollments = async () => {
      try {
        setLoading(true);

        const result = await getEnrollments();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrollments();
  }, []);

  // ROLE STATS
  const roleStats = ["Singer", "Dancer", "Musician"].map((role) => ({
    role,
    count: users.filter((u) => u.role === role).length,
  }));

  // REVENUE TREND
  const revenueStats = Object.values(
    users.reduce((acc, user) => {
      const dateObj = new Date(user.createdAt);

      const dateLabel = dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      if (!acc[dateLabel]) {
        acc[dateLabel] = {
          date: dateLabel,
          revenue: 0,
          fullDate: dateObj, // 👈 store real date for sorting
        };
      }

      if (user.paymentId) {
        acc[dateLabel].revenue += 500;
      }

      return acc;
    }, {}),
  ).sort((a, b) => a.fullDate - b.fullDate); // 🔥 SORT FIX

  const isFilterActive =
    search ||
    roleFilter !== "All" ||
    paymentFilter !== "All" ||
    sortBy !== "latest";

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setPaymentFilter("All");
    setSortBy("latest");
  };

  // FILTER LOGIC
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        (paymentFilter === "Paid" && user.paymentId) ||
        (paymentFilter === "Pending" && !user.paymentId);

      return matchesSearch && matchesRole && matchesPayment;
    })
    .sort((a, b) => {
      if (sortBy === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  // STATS
  const totalUsers = users.length;
  const paidUsers = users.filter((u) => u.paymentId).length;
  const totalRevenue = paidUsers * 500;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Manage and monitor all enrollments
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-4 gap-6">
        <StatCard label="Total Enrollments" value={totalUsers} />
        <StatCard label="Paid Users" value={paidUsers} />
        <StatCard label="Revenue" value={`₹${totalRevenue}`} />
        <StatCard label="Latest Entry" value={users[0]?.name || "—"} />
      </div>

      {/* ROLE CHART */}
      <div className="max-w-6xl mx-auto mt-10 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-6 text-gray-200">
          Enrollments by Role
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={roleStats} barCategoryGap="50%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="role" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            <Bar
              dataKey="count"
              radius={[10, 10, 0, 0]}
              barSize={30}
              fill="url(#barGradient)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* REVENUE CHART */}
      <div className="max-w-6xl mx-auto mt-10 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-6 text-gray-200">
          Revenue Trend
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* FILTERS */}
      <div className="max-w-6xl mx-auto mt-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white"
          >
            <option>All</option>
            <option>Singer</option>
            <option>Dancer</option>
            <option>Musician</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-white/20"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>

          <button
            onClick={clearFilters}
            disabled={!isFilterActive || loading}
            className="px-4 py-2 border border-white/20 rounded-lg"
          >
            Clear Filters
          </button>
        </div>

        <button
          onClick={() => exportCSV(filteredUsers)}
          disabled={loading || users.length === 0}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition"
        >
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto mt-6 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Payment</th>
            </tr>
          </thead>

          {loading ? (
            <TableSkeleton />
          ) : (
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-t border-white/10">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {user.paymentId ? "Paid" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-center mt-6 gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-white/10 rounded-lg"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-gray-300">Page {currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) =>
              indexOfLast < filteredUsers.length ? p + 1 : p,
            )
          }
          className="px-4 py-2 bg-white/10 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <tbody>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="border-t border-white/10 animate-pulse">
          <td className="px-6 py-4">
            <div className="h-4 bg-white/10 rounded w-24"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-white/10 rounded w-20"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-white/10 rounded w-16"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-white/10 rounded w-20"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-white/10 rounded w-16"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
      <p className="text-gray-400 text-sm">{label}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
