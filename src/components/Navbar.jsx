import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);

  useEffect(() => {
    console.log("Current User:", user);
  }, [user]);

  const handleLogout = () => {
    console.log("Logout button clicked");
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-[65px] px-8 bg-[#1a1a2e]/95 backdrop-blur-xl border-b border-[#2d2d4e]">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        ⚡ AuthApp
      </Link>

      {/* Right Side Links */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-slate-400">
              👋 <strong className="text-slate-100">{user.name}</strong>
            </span>

            <Link
              to="/dashboard"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 border ${
                hoverLogout
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-[#2d2d4e] text-slate-400 hover:border-red-500 hover:text-red-400"
              }`}
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-sm font-semibold text-white px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-opacity"
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
