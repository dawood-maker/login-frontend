import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP, resetPassword } from "../utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  // Step: 1 = enter email, 2 = enter OTP, 3 = enter new password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusField, setFocusField] = useState("");

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.85rem 1rem",
    background: "#0d0d1f",
    border: `1.5px solid ${focusField === field ? "#4f46e5" : "#2d2d4e"}`,
    borderRadius: "10px",
    color: "#f1f5f9",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.25s ease",
    fontFamily: "DM Sans, sans-serif",
    boxShadow:
      focusField === field ? "0 0 0 3px rgba(79, 70, 229, 0.15)" : "none",
  });

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await forgotPassword({ email });
      setSuccess(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await verifyOTP({ email, otp });
      setSuccess(res.data.message);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await resetPassword({ email, otp, newPassword });
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(79,70,229,0.15) 0%, transparent 60%), #0f0f1a",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(26, 26, 46, 0.9)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: "1px solid #2d2d4e",
          padding: "2.5rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.4s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Steps indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "1.8rem",
          }}
        >
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: s === step ? "2.5rem" : "0.75rem",
                height: "0.4rem",
                borderRadius: "99px",
                background:
                  s <= step
                    ? "linear-gradient(90deg, #4f46e5, #7c3aed)"
                    : "#2d2d4e",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.6rem",
              boxShadow: "0 10px 30px rgba(79,70,229,0.4)",
            }}
          >
            {stepTitles[step].icon}
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1.6rem",
              background: "linear-gradient(135deg, #f1f5f9, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.4rem",
            }}
          >
            {stepTitles[step].title}
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
            {stepTitles[step].sub}
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
              marginBottom: "1.2rem",
              color: "#fca5a5",
              fontSize: "0.875rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
              marginBottom: "1.2rem",
              color: "#86efac",
              fontSize: "0.875rem",
            }}
          >
            ✅ {success}
          </div>
        )}

        {/* STEP 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField("")}
                style={inputStyle("email")}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: loading
                  ? "#3730a3"
                  : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Syne, sans-serif",
                opacity: loading ? 0.8 : 1,
                boxShadow: loading ? "none" : "0 10px 30px rgba(79,70,229,0.4)",
              }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Sending OTP...
                </span>
              ) : (
                "📤 Send OTP"
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Enter 6-digit OTP
              </label>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                maxLength={6}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                onFocus={() => setFocusField("otp")}
                onBlur={() => setFocusField("")}
                style={{
                  ...inputStyle("otp"),
                  textAlign: "center",
                  fontSize: "1.8rem",
                  letterSpacing: "8px",
                  fontFamily: "Syne, sans-serif",
                }}
                required
              />
              <p
                style={{
                  color: "#475569",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                OTP valid for 10 minutes only
              </p>
            </div>
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              style={{
                width: "100%",
                padding: "0.9rem",
                background:
                  loading || otp.length < 6
                    ? "#3730a3"
                    : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: loading || otp.length < 6 ? "not-allowed" : "pointer",
                fontFamily: "Syne, sans-serif",
                opacity: loading || otp.length < 6 ? 0.7 : 1,
                boxShadow:
                  loading || otp.length < 6
                    ? "none"
                    : "0 10px 30px rgba(79,70,229,0.4)",
              }}
            >
              {loading ? "Verifying..." : "✔️ Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setError("");
                setSuccess("");
              }}
              style={{
                width: "100%",
                padding: "0.7rem",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                marginTop: "0.8rem",
                fontSize: "0.875rem",
              }}
            >
              ← Back / Resend OTP
            </button>
          </form>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: "1.2rem" }}>
              <label
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocusField("newpass")}
                onBlur={() => setFocusField("")}
                style={inputStyle("newpass")}
                required
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocusField("confirm")}
                onBlur={() => setFocusField("")}
                style={{
                  ...inputStyle("confirm"),
                  borderColor:
                    confirmPassword && confirmPassword !== newPassword
                      ? "#ef4444"
                      : focusField === "confirm"
                        ? "#4f46e5"
                        : "#2d2d4e",
                }}
                required
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.78rem",
                    marginTop: "0.4rem",
                  }}
                >
                  ⚠️ Passwords don't match
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: loading
                  ? "#3730a3"
                  : "linear-gradient(135deg, #22c55e, #16a34a)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Syne, sans-serif",
                opacity: loading ? 0.8 : 1,
                boxShadow: loading
                  ? "none"
                  : "0 10px 30px rgba(34,197,94,0.35)",
              }}
            >
              {loading ? "Resetting..." : "🔐 Reset Password"}
            </button>
          </form>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#64748b",
            fontSize: "0.875rem",
          }}
        >
          Remember password?{" "}
          <Link
            to="/login"
            style={{
              color: "#818cf8",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
