import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: "🔐",
    title: "JWT Authentication",
    desc: "Secure token-based auth with auto refresh and protected routes.",
  },
  {
    icon: "📧",
    title: "OTP via Email",
    desc: "6-digit OTP delivered to your inbox for password reset.",
  },
  {
    icon: "🛡️",
    title: "Protected Routes",
    desc: "Only authenticated users can access private pages.",
  },
  {
    icon: "⚡",
    title: "Instant Sessions",
    desc: "Stay logged in across refreshes with localStorage persistence.",
  },
];

const stack = [
  { label: "MongoDB", color: "from-green-600 to-green-400", icon: "🍃" },
  { label: "Express.js", color: "from-slate-600 to-slate-400", icon: "⚡" },
  { label: "React", color: "from-cyan-600 to-cyan-400", icon: "⚛️" },
  { label: "Node.js", color: "from-lime-600 to-lime-400", icon: "🟢" },
  { label: "JWT", color: "from-yellow-600 to-yellow-400", icon: "🔑" },
  { label: "Nodemailer", color: "from-rose-600 to-rose-400", icon: "📨" },
];

const Home = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("Home Page Loaded");
    setTimeout(() => setVisible(true), 100);
  }, [user]);

  return (
    <div className="relative min-h-screen bg-[#0f0f1a] overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(79,70,229,0.18)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] px-6 text-center">
        {/* Badge */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="inline-flex items-center gap-2 bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-5 py-2 rounded-full mb-8 tracking-widest uppercase">
            ⚡ Full Stack MERN Auth
          </span>
        </div>

        {/* Heading */}
        <div
          className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight mb-6">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent block">
              Secure Auth
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Made Simple.
            </span>
          </h1>
        </div>

        {/* Description */}
        <div
          className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
            Production-ready authentication with{" "}
            <span className="text-indigo-300 font-semibold">JWT</span>,{" "}
            <span className="text-purple-300 font-semibold">OTP email reset</span>,{" "}
            <span className="text-pink-300 font-semibold">protected routes</span>, and
            persistent sessions — all in one clean package.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`transition-all duration-700 delay-300 flex flex-wrap justify-center gap-4 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {user ? (
            <Link
              to="/dashboard"
              className="group relative px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/30 hover:-translate-y-1 hover:shadow-indigo-600/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">→ Go to Dashboard</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="group relative px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/30 hover:-translate-y-1 hover:shadow-indigo-600/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">🚀 Get Started Free</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-xl border border-[#2d2d4e] text-slate-400 font-semibold hover:border-indigo-500/60 hover:text-indigo-400 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
              >
                Sign In →
              </Link>
            </>
          )}
        </div>

        {/* Scroll hint */}
        <div
          className={`mt-16 transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-2 text-slate-600 text-xs">
            <span>Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-12">
            <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
              What's Included
            </p>
            <h2 className="text-3xl font-extrabold text-slate-100">
              Everything You Need
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-[#1a1a2e]/70 border border-[#2d2d4e] hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1a1a2e]/90 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-slate-100 font-bold text-sm mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <p className="text-slate-600 text-xs font-semibold tracking-widest uppercase mb-6">
              Built With
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {stack.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#2d2d4e] text-slate-400 text-xs font-medium hover:border-indigo-500/40 hover:text-slate-200 transition-all duration-200"
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      {!user && (
        <section className="relative z-10 px-6 pb-20">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-indigo-600/20 to-purple-600/15 border border-indigo-500/30 rounded-2xl p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-extrabold text-slate-100 mb-3">
              Ready to get started?
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Create your free account in seconds.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:-translate-y-1 shadow-lg shadow-indigo-600/30 transition-all duration-300"
            >
              ✨ Create Free Account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;