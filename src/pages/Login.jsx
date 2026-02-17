import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import singup from "../assets/singup.png";
import email from "../assets/email.png";
import lock from "../assets/lock.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Login Page Loaded");
  }, []);

  const handleChange = (e) => {
    console.log("Input Changed:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Login Form:", formData);

    setLoading(true);
    setError("");

    try {
      const res = await loginUser(formData);
      console.log("Login Success:", res.data);

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login Error:", err.response?.data);
      setError(
        err.response?.data?.message || "Login failed. Check credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 bg-[#0f0f1a] overflow-hidden
      bg-[radial-gradient(ellipse_at_70%_50%,rgba(79,70,229,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(124,58,237,0.1)_0%,transparent_60%)]"
    >
      {/* Floating Decoration */}
      <div
        className="fixed top-[20%] right-[10%] w-[350px] h-[350px] 
        bg-[radial-gradient(circle,rgba(79,70,229,0.12)_0%,transparent_70%)] 
        rounded-full animate-pulse pointer-events-none"
      />

      <div
        className="relative z-10 w-full max-w-md bg-[#1a1a2e]/90 backdrop-blur-xl 
        border border-[#2d2d4e] rounded-2xl p-10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={singup}
            alt="singup"
            className="w-25 h-20 mx-auto mb-4 flex items-center justify-center 
            text-xl rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 
            shadow-lg shadow-indigo-600/40"
          />
          <h1
            className="text-2xl font-extrabold bg-gradient-to-r 
            from-slate-100 to-indigo-400 bg-clip-text text-transparent"
          >
            Welcome Back
          </h1>

          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
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
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A52] shadow-md">
            {/* Email icon */}
            <img
              src={email} // Make sure this import exists
              alt="email icon"
              className="w-5 h-5 sm:w-6 cursor-pointer object-contain mix-blend-multiply"
            />

            {/* Input with left padding for icon */}
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent rounded-[5px] bg-[#333A52] outline-none text-white w-full text-sm"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A52] shadow-md">
            {/* Password icon */}
            <img
              src={lock} // Make sure this import exists
              alt="email icon"
              className="w-5 h-5 sm:w-6 cursor-pointer object-contain mix-blend-multiply"
            />
            {/* Input with left padding for icon */}
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-transparent rounded-[5px] bg-[#333A52] outline-none text-white w-full text-sm"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white 
    bg-gradient-to-r from-indigo-600 to-purple-600 
    hover:opacity-90 transition disabled:opacity-70 
    shadow-lg shadow-indigo-600/40 flex items-center justify-center gap-2 "
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <img
                  src={lock} // <-- yahan aap apni image ka path den
                  alt="Lock Icon"
                  className="w-5 h-5 cursor-pointer object-contain mix-blend-multiply" // size adjust karne ke liye
                />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition"
          >
            Sign up →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
