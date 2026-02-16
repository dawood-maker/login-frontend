import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.2) 0%, transparent 60%), #0f0f1a",
      }}
    >
      {/* Floating decorations */}
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          animation: "fadeIn 0.7s ease",
          position: "relative",
          zIndex: 1,
          maxWidth: "650px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(79,70,229,0.15)",
            border: "1px solid rgba(79,70,229,0.3)",
            borderRadius: "99px",
            padding: "0.4rem 1rem",
            marginBottom: "2rem",
            color: "#818cf8",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          ⚡ Full Stack Auth System
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #f1f5f9 30%, #818cf8 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Secure Auth
          <br />
          Made Simple
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Complete authentication system with{" "}
          <strong style={{ color: "#c4b5fd" }}>Login</strong>,{" "}
          <strong style={{ color: "#c4b5fd" }}>Register</strong>,{" "}
          <strong style={{ color: "#c4b5fd" }}>Logout</strong> and{" "}
          <strong style={{ color: "#c4b5fd" }}>OTP Password Reset</strong> via
          email.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {user ? (
            <Link
              to="/dashboard"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "white",
                padding: "0.9rem 2rem",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                fontFamily: "Syne, sans-serif",
                boxShadow: "0 10px 30px rgba(79,70,229,0.4)",
                transition: "all 0.25s ease",
              }}
            >
              → Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color: "white",
                  padding: "0.9rem 2rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  fontFamily: "Syne, sans-serif",
                  boxShadow: "0 10px 30px rgba(79,70,229,0.4)",
                }}
              >
                🚀 Get Started Free
              </Link>
              <Link
                to="/login"
                style={{
                  background: "transparent",
                  border: "1.5px solid #2d2d4e",
                  color: "#94a3b8",
                  padding: "0.9rem 2rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Sign In →
              </Link>
            </>
          )}
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "3rem",
          }}
        >
          {[
            "🍃 MongoDB",
            "⚡ Express.js",
            "⚛️ React",
            "🟢 Node.js",
            "📧 Email OTP",
            "🔐 JWT Auth",
          ].map((f) => (
            <span
              key={f}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid #2d2d4e",
                borderRadius: "99px",
                padding: "0.35rem 0.9rem",
                fontSize: "0.8rem",
                color: "#64748b",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
