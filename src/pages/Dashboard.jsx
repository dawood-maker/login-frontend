import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cards = [
    { icon: "👤", label: "Full Name", value: user?.name },
    { icon: "📧", label: "Email", value: user?.email },
    { icon: "🛡️", label: "Account Status", value: "Active & Verified" },
    {
      icon: "📅",
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Today",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(79,70,229,0.1) 0%, transparent 60%), #0f0f1a",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          animation: "fadeIn 0.5s ease",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(124,58,237,0.2))",
            border: "1px solid rgba(79,70,229,0.3)",
            borderRadius: "20px",
            padding: "2.5rem",
            marginBottom: "2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Background grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.2rem",
              fontSize: "2rem",
              boxShadow: "0 15px 40px rgba(79,70,229,0.5)",
              animation: "glow 3s ease-in-out infinite",
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || "👤"}
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "2rem",
              background: "linear-gradient(135deg, #f1f5f9, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.4rem",
            }}
          >
            Welcome, {user?.name?.split(" ")[0]}! 🎉
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
            You're successfully logged in to your dashboard
          </p>
        </div>

        {/* Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "rgba(26, 26, 46, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid #2d2d4e",
                borderRadius: "14px",
                padding: "1.3rem",
                transition: "all 0.25s ease",
                cursor: "default",
                animation: `fadeIn 0.5s ease ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4f46e5";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2d2d4e";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>
                {card.icon}
              </div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.3rem",
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  color: "#f1f5f9",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  wordBreak: "break-word",
                }}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Status Badge */}
        <div
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "14px",
            padding: "1.2rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34,197,94,0.6)",
              flexShrink: 0,
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <p style={{ color: "#86efac", fontSize: "0.9rem", fontWeight: 500 }}>
            🔒 Your session is secure. Authentication token is active.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: "block",
            width: "100%",
            padding: "0.9rem",
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "Syne, sans-serif",
            letterSpacing: "0.3px",
            boxShadow: "0 10px 30px rgba(239,68,68,0.3)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(239,68,68,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(239,68,68,0.3)";
          }}
        >
          🚪 Logout from Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
