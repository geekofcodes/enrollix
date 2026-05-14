import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, paymentId } = location.state || {};

  // 🔥 ADD THIS
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">

        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-2xl font-bold mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-300 mb-2">
          Thank you {name || "User"}, your enrollment is confirmed.
        </p>

        {/* 👇 Add this line */}
        <p className="text-sm text-gray-400 mb-6">
          Redirecting to home in 5 seconds...
        </p>

        <div className="bg-white/5 p-4 rounded-lg text-sm mb-6">
          <p className="text-gray-400">Payment ID</p>
          <p className="font-mono mt-1">{paymentId || "N/A"}</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            Admin
          </button>
        </div>

      </div>
    </div>
  );
}