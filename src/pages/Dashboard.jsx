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
    <div className="min-h-screen bg-[#0f0f1a] bg-[radial-gradient(ellipse_at_30%_20%,rgba(79,70,229,0.1)_0%,transparent_60%)] px-8 py-12">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Hero Section */}
        <div className="relative overflow-hidden text-center mb-8 p-10 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/25 to-purple-600/20 backdrop-blur-lg">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:30px_30px]" />

          {/* Avatar */}
          <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-full text-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-600/50 animate-pulse">
            {user?.name?.charAt(0)?.toUpperCase() || "👤"}
          </div>

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-slate-100 to-indigo-400 bg-clip-text text-transparent mb-2">
            Welcome, {user?.name?.split(" ")[0]}! 🎉
          </h1>

          <p className="text-slate-400 text-sm">
            You're successfully logged in to your dashboard
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-[#1a1a2e]/80 backdrop-blur-lg border border-[#2d2d4e] hover:border-indigo-600 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl mb-3">{card.icon}</div>

              <p className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">
                {card.label}
              </p>

              <p className="text-slate-100 text-sm font-semibold break-words">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-xl px-6 py-4 mb-8">
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/60 animate-ping" />
          <p className="text-green-300 text-sm font-medium">
            🔒 Your session is secure. Authentication token is active.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl font-bold text-white text-base bg-gradient-to-r from-red-500 to-red-700 shadow-lg shadow-red-500/30 hover:-translate-y-1 hover:shadow-red-600/40 transition-all duration-300"
        >
          🚪 Logout from Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
