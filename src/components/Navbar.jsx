import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked from dropdown");
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  // Get first letter of user name
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

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

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              Dashboard
            </Link>

            {/* Avatar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-600/40 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                title={user.name}
              >
                {firstLetter}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-fadeIn">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-[#2d2d4e]">
                    <p className="text-slate-100 text-sm font-semibold truncate">
                      {user.name}
                    </p>
                    <p className="text-slate-500 text-xs truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Logout Option */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150 flex items-center gap-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
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