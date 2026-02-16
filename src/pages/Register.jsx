import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusField, setFocusField] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await registerUser(formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.1) 0%, transparent 60%), #0f0f1a",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "15%",
          right: "8%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

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
          animation: "fadeIn 0.5s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
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
            🚀
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1.7rem",
              background: "linear-gradient(135deg, #f1f5f9, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.4rem",
            }}
          >
            Create Account
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Join us today, it's free!
          </p>
        </div>

        {/* Error */}
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
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusField("name")}
              onBlur={() => setFocusField("")}
              style={inputStyle("name")}
              required
            />
          </div>

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
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField("")}
              style={inputStyle("email")}
              required
            />
          </div>

          <div style={{ marginBottom: "1.8rem" }}>
            <label
              style={{
                display: "block",
                color: "#94a3b8",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              style={inputStyle("password")}
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
              letterSpacing: "0.3px",
              transition: "all 0.25s ease",
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
                Creating Account...
              </span>
            ) : (
              "✨ Create Account"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#64748b",
            fontSize: "0.9rem",
          }}
        >
          Already have an account?{" "}
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

export default Register;
