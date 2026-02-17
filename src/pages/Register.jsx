import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log("Register Page Loaded");
  }, []);

  const handleChange = (e) => {
    console.log("Input Changed:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Register Form:", formData);

    setLoading(true);
    setError("");

    try {
      const res = await registerUser(formData);
      console.log("Registration Success:", res.data);

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("Registration Error:", err.response?.data);
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 bg-[#0f0f1a] overflow-hidden
      bg-[radial-gradient(ellipse_at_20%_50%,rgba(79,70,229,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(124,58,237,0.1)_0%,transparent_60%)]"
    >
      {/* Decorative Blobs */}
      <div
        className="fixed top-[10%] left-[5%] w-[300px] h-[300px]
        bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_70%)]
        rounded-full animate-pulse pointer-events-none"
      />

      <div
        className="fixed bottom-[15%] right-[8%] w-[250px] h-[250px]
        bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_70%)]
        rounded-full animate-pulse pointer-events-none"
      />

      <div
        className="relative z-10 w-full max-w-md bg-[#1a1a2e]/90 backdrop-blur-xl
        border border-[#2d2d4e] rounded-2xl p-10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 mx-auto mb-4 flex items-center justify-center
            text-xl rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600
            shadow-lg shadow-indigo-600/40"
          >
            🚀
          </div>

          <h1
            className="text-2xl font-extrabold bg-gradient-to-r
            from-slate-100 to-indigo-400 bg-clip-text text-transparent"
          >
            Create Account
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Join us today, it's free!
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="bg-red-500/10 border border-red-500/30
            text-red-300 text-sm px-4 py-3 rounded-lg mb-6"
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-400 text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d1f]
                border border-[#2d2d4e] text-slate-100
                focus:border-indigo-600 focus:ring-2
                focus:ring-indigo-600/30 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d1f]
                border border-[#2d2d4e] text-slate-100
                focus:border-indigo-600 focus:ring-2
                focus:ring-indigo-600/30 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d1f]
                border border-[#2d2d4e] text-slate-100
                focus:border-indigo-600 focus:ring-2
                focus:ring-indigo-600/30 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:opacity-90 transition disabled:opacity-70
              shadow-lg shadow-indigo-600/40 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "✨ Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition"
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
