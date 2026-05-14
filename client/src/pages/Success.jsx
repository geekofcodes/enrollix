import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, paymentId } = location.state || {};

  const timerRef = useRef(null);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [navigate]);

  const handleDownload = () => {
    if (!paymentId) return;


    clearInterval(timerRef.current);

    window.open(
      `${import.meta.env.VITE_API_URL}/payment/receipt/${paymentId}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
        {/* 🎉 Icon */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>

        {/* Message */}
        <p className="text-gray-300 mb-2">
          Thank you {name || "User"}, your enrollment is confirmed.
        </p>

        {/* Countdown */}
        <p className="text-sm text-gray-400 mb-6">
          Redirecting to home in {seconds} seconds...
        </p>

        {/* Payment Info */}
        <div className="bg-white/5 p-4 rounded-lg text-sm mb-6">
          <p className="text-gray-400">Payment ID</p>
          <p className="font-mono mt-1 break-all">{paymentId || "N/A"}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={handleDownload}
            disabled={!paymentId}
            className={`px-4 py-2 rounded-lg ${
              paymentId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Download Receipt 📄
          </button>
        </div>
      </div>
    </div>
  );
}
