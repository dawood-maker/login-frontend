import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard Loaded");
    console.log("Current User:", user);
  }, [user]);

  const handleLogout = () => {
    console.log("Logout button clicked from Dashboard");
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
    <div className="min-h-screen bg-[#0f0f1a] relative overflow-hidden px-8 py-12">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-40 animate-[gradient_15s_ease_infinite] -z-10" />
      
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Hero Section */}
        <div className="relative overflow-hidden text-center mb-10 p-10 rounded-3xl border border-indigo-500/30 bg-white/5 backdrop-blur-lg shadow-lg">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2)_0%,transparent_70%)]" />

          {/* Avatar */}
          <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center rounded-full text-3xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-600/50 animate-pulse ring-4 ring-indigo-500/40">
            {user?.name?.charAt(0)?.toUpperCase() || "👤"}
          </div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-100 to-indigo-400 bg-clip-text text-transparent mb-2 animate-textGlow">
            Welcome, {user?.name?.split(" ")[0]}! 🎉
          </h1>

          <p className="text-slate-400 text-sm">
            You’re successfully logged in to your dashboard
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative bg-[#1a1a2e]/70 backdrop-blur-md border border-[#2d2d4e] rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-indigo-500/80 hover:shadow-xl hover:shadow-indigo-500/40"
            >
              <div className="text-3xl mb-3 group-hover:animate-pulse">{card.icon}</div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">
                {card.label}
              </p>
              <p className="text-slate-100 text-sm font-semibold break-words">{card.value}</p>
              <span className="absolute top-0 left-0 w-full h-full rounded-xl border border-indigo-400/20 opacity-0 group-hover:opacity-100 transition-all"></span>
            </div>
          ))}
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-xl px-6 py-4 mb-8 animate-pulse">
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/60 animate-ping" />
          <p className="text-green-300 text-sm font-medium">
            🔒 Your session is secure. Authentication token is active.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl font-bold text-white text-base bg-gradient-to-r from-red-500 to-red-700 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-red-600/50 transition-all duration-300"
        >
          🚪 Logout from Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;