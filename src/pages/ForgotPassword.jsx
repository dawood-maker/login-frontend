import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("[ForgotPassword] Submitting email:", email);
    if (!email) return setError("Please enter your email address.");
    setError("");
    setLoading(true);

    try {
      const res = await authAPI.forgotPassword({ email });
      console.log("[ForgotPassword] OTP sent:", res.data);
      setSuccess(res.data.message);

      // OTP page par jao
      setTimeout(() => {
        navigate("/verify-otp", { state: { email, purpose: "forgot" } });
      }, 1200);
    } catch (err) {
      console.error("[ForgotPassword] Error sending OTP:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-5 text-white">
        {/* Icon */}
        <div className="text-5xl text-red-500 text-center animate-bounce">🔑</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <p className="text-gray-400 text-center text-sm">
          Apna email daalo — hum aapko OTP bhejenge
          <br />
          password reset karne ke liye
        </p>

        {/* Alerts */}
        {error && <div className="bg-red-600 text-white px-3 py-2 rounded-md">{error}</div>}
        {success && <div className="bg-green-600 text-white px-3 py-2 rounded-md">{success}</div>}

        {/* Email Input */}
        <div className="flex flex-col space-y-1">
          <label className="text-gray-300 font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Aapka registered email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex justify-center items-center bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Sending OTP...
            </>
          ) : (
            "Send Reset OTP 📨"
          )}
        </button>

        {/* Links */}
        <div className="text-center text-gray-400 text-sm">
          Yaad aa gaya?{" "}
          <Link className="text-purple-400 hover:underline" to="/login">
            Login karo
          </Link>
        </div>
        <div className="text-center text-sm">
          <Link
            to="/register"
            className="text-purple-400 hover:underline text-sm"
          >
            Naya account banao
          </Link>
        </div>
      </div>
    </div>
  );
}