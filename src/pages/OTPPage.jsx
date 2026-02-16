import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const { email, purpose, name } = location.state || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if no email
  useEffect(() => {
    if (!email) navigate("/register");
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // Input change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    setError("");

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  // Backspace & Enter
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") handleSubmit();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const otpCode = otp.join("");

  const handleSubmit = async () => {
    if (otpCode.length !== 6) return setError("Please enter all 6 digits.");
    setLoading(true);
    setError("");
    console.log("[OTPPage] Verifying OTP:", otpCode, "for", purpose);

    try {
      if (purpose === "register") {
        const res = await authAPI.verifyOTP({ email, otp: otpCode });
        console.log("[OTPPage] Registration OTP verified:", res.data.user);
        login(res.data.token, res.data.user);
        navigate("/dashboard");
      } else if (purpose === "forgot") {
        await authAPI.verifyForgotOTP({ email, otp: otpCode });
        console.log(
          "[OTPPage] Forgot OTP verified, redirecting to reset password",
        );
        navigate("/reset-password", { state: { email, otp: otpCode } });
      } else if (purpose === "change_email") {
        const res = await authAPI.changeEmailVerify({ otp: otpCode });
        console.log("[OTPPage] Email change verified");
        setSuccess("Email changed successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      console.error("[OTPPage] OTP verification failed:", err);
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setTimer(60);
    setError("");
    console.log("[OTPPage] Resending OTP...");

    try {
      await authAPI.resendOTP({ email, purpose });
      setSuccess("New OTP sent to your email!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("[OTPPage] Resend OTP failed:", err);
      setError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const titles = {
    register: { icon: "📬", title: "Verify Email", color: "purple" },
    forgot: { icon: "🔑", title: "Verify Identity", color: "red" },
    change_email: { icon: "📧", title: "Verify New Email", color: "green" },
  };
  const info = titles[purpose] || titles.register;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-6 text-center text-white space-y-4">
        {/* Icon */}
        <div
          className={`text-5xl ${info.color === "purple" ? "text-purple-500" : info.color === "red" ? "text-red-500" : "text-green-500"} animate-bounce`}
        >
          {info.icon}
        </div>

        <h1 className="text-2xl font-bold">{info.title}</h1>
        <p className="text-gray-400 text-sm">
          6-digit OTP bheja gaya hai
          <br />
          <span className="text-purple-400 font-medium">{email}</span>
        </p>

        {/* Alerts */}
        {error && (
          <div className="bg-red-600 text-white px-3 py-2 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 text-white px-3 py-2 rounded-md">
            {success}
          </div>
        )}

        {/* OTP Inputs */}
        <div
          className="flex justify-between mt-2 space-x-2"
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
              className={`w-12 h-12 text-xl font-bold text-center rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                digit ? "border-2 border-purple-500" : "border border-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || otpCode.length !== 6}
          className="w-full mt-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-medium disabled:opacity-50 transition"
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
              Verifying...
            </>
          ) : (
            "Verify OTP ✓"
          )}
        </button>

        {/* Timer & Resend */}
        <div className="text-gray-400 text-sm mt-2">
          {canResend ? (
            <>
              OTP expire ho gaya?{" "}
              <button
                className="text-purple-400 hover:underline"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            </>
          ) : (
            <>
              Resend OTP in <span className="font-medium">{timer}s</span>
            </>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-3">
          <button
            className="text-gray-400 hover:text-white text-sm hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Wapas jao
          </button>
        </div>
      </div>
    </div>
  );
}
