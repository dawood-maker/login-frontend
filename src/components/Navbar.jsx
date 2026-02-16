import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navStyle = {
  background: "rgba(26, 26, 46, 0.95)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid #2d2d4e",
  padding: "0 2rem",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "65px",
};

const logoStyle = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 800,
  fontSize: "1.4rem",
  background: "linear-gradient(135deg, #818cf8, #4f46e5)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textDecoration: "none",
  letterSpacing: "-0.5px",
};

const navLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        ⚡ AuthApp
      </Link>

      <div style={navLinksStyle}>
        {user ? (
          <>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              👋 <strong style={{ color: "#f1f5f9" }}>{user.name}</strong>
            </span>
            <Link
              to="/dashboard"
              style={{
                color: "#818cf8",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              style={{
                background: hoverLogout ? "#dc2626" : "transparent",
                border: `1px solid ${hoverLogout ? "#dc2626" : "#2d2d4e"}`,
                color: hoverLogout ? "white" : "#94a3b8",
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.875rem",
                transition: "all 0.2s ease",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "white",
                textDecoration: "none",
                padding: "0.45rem 1.2rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 600,
                transition: "opacity 0.2s",
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
