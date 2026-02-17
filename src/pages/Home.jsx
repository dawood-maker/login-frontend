import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("Home Page Loaded");
    console.log("Current User:", user);
  }, [user]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#0f0f1a] bg-[radial-gradient(ellipse_at_50%_0%,rgba(79,70,229,0.2)_0%,transparent_60%)] overflow-hidden">
      {/* Floating Decorations */}
      <div className="fixed top-[15%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(79,70,229,0.1)_0%,transparent_70%)] rounded-full animate-pulse pointer-events-none" />

      <div className="fixed bottom-[10%] right-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(124,58,237,0.1)_0%,transparent_70%)] rounded-full animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-2xl animate-fadeIn">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-600/15 border border-indigo-600/30 text-indigo-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
          ⚡ Full Stack Auth System
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight mb-6 bg-gradient-to-br from-slate-100 to-indigo-400 bg-clip-text text-transparent">
          Secure Auth
          <br />
          Made Simple
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          Complete authentication system with{" "}
          <strong className="text-purple-300">Login</strong>,{" "}
          <strong className="text-purple-300">Register</strong>,{" "}
          <strong className="text-purple-300">Logout</strong> and{" "}
          <strong className="text-purple-300">OTP Password Reset</strong> via
          email.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300"
            >
              → Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300"
              >
                🚀 Get Started Free
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-xl border border-[#2d2d4e] text-slate-400 font-semibold hover:border-indigo-600 hover:text-indigo-400 transition-all duration-300"
              >
                Sign In →
              </Link>
            </>
          )}
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
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
              className="px-4 py-2 text-xs rounded-full bg-white/5 border border-[#2d2d4e] text-slate-500"
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
