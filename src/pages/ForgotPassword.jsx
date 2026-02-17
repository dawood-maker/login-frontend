import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP, resetPassword } from "../utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    console.log("Current Step:", step);
  }, [step]);

  // STEP 1
  const handleSendOTP = async (e) => {
    e.preventDefault();
    console.log("Sending OTP to:", email);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ✅ FIX: forgotPassword already returns response.data
      // isliye res.data nahi, seedha res use karo
      const res = await forgotPassword({ email });
      console.log("OTP Sent Response:", res);
      setSuccess(res.message); // ✅ res.message (res.data.message nahi)
      setStep(2);
    } catch (err) {
      console.log("Send OTP Error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await verifyOTP({ email, otp });
      console.log("OTP Verified:", res.data);
      setSuccess(res.data.message);
      setStep(3);
    } catch (err) {
      console.log("OTP Verification Error:", err.response?.data);
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return setError("Passwords do not match!");
    }

    if (newPassword.length < 6) {
      console.log("Password too short");
      return setError("Password must be at least 6 characters");
    }

    console.log("Resetting password for:", email);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await resetPassword({ email, otp, newPassword });
      console.log("Password Reset Success:", res.data);
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.log("Reset Password Error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = {
    1: {
      icon: "📧",
      title: "Forgot Password",
      sub: "Enter your email to receive OTP",
    },
    2: { icon: "🔢", title: "Enter OTP", sub: `OTP sent to ${email}` },
    3: { icon: "🔑", title: "New Password", sub: "Set your new password" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0f0f1a] bg-[radial-gradient(ellipse_at_50%_30%,rgba(79,70,229,0.15)_0%,transparent_60%)]">
      <div className="w-full max-w-md bg-[#1a1a2e]/90 backdrop-blur-xl border border-[#2d2d4e] rounded-2xl p-10 shadow-2xl">
        {/* Steps Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-500 ${
                s === step
                  ? "w-10 bg-gradient-to-r from-indigo-600 to-purple-600"
                  : s < step
                    ? "w-6 bg-indigo-500"
                    : "w-3 bg-[#2d2d4e]"
              }`}
            />
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-xl rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
            {stepTitles[step].icon}
          </div>

          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-slate-100 to-indigo-400 bg-clip-text text-transparent">
            {stepTitles[step].title}
          </h1>

          <p className="text-slate-500 text-sm mt-1">{stepTitles[step].sub}</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-lg mb-5">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-300 text-sm px-4 py-3 rounded-lg mb-5">
            ✅ {success}
          </div>
        )}

        {/* STEP CONTENT */}
        <form
          onSubmit={
            step === 1
              ? handleSendOTP
              : step === 2
                ? handleVerifyOTP
                : handleResetPassword
          }
          className="space-y-5"
        >
          {step === 1 && (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d1f] border border-[#2d2d4e] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30 outline-none text-slate-100"
            />
          )}

          {step === 2 && (
            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full text-center text-2xl tracking-[8px] px-4 py-3 rounded-lg bg-[#0d0d1f] border border-[#2d2d4e] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30 outline-none text-slate-100"
            />
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0d0d1f] border border-[#2d2d4e] focus:border-green-600 focus:ring-2 focus:ring-green-600/30 outline-none text-slate-100"
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg bg-[#0d0d1f] border outline-none text-slate-100 ${
                  confirmPassword && confirmPassword !== newPassword
                    ? "border-red-500"
                    : "border-[#2d2d4e] focus:border-green-600 focus:ring-2 focus:ring-green-600/30"
                }`}
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition disabled:opacity-70"
          >
            {loading
              ? "Processing..."
              : step === 1
                ? "📤 Send OTP"
                : step === 2
                  ? "✔️ Verify OTP"
                  : "🔐 Reset Password"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Remember password?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:text-indigo-300"
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
  