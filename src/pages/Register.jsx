import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import registerImg from "../assets/register.png";

// 👇 Input Icons (Apni images yahan rakhna)
import userIcon from "../assets/user.png";
import emailIcon from "../assets/email.png";
import lockIcon from "../assets/lock.png";
import confirmIcon from "../assets/confirm.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, password, confirm } = form;

    if (!name || !email || !password || !confirm)
      return setError("Please fill all fields.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    try {
      setLoading(true);

      await authAPI.register({ name, email, password });

      navigate("/verify-otp", {
        state: { email, purpose: "register", name },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-white space-y-6 transition-all duration-500">
        {/* Top Image */}

        <img
          className="w-20 h-20 sm:w-24 rounded-[30px] ml-[120px] sm:h-24 md:w-32 md:h-32 cursor-pointer object-contain"
          src={registerImg}
          alt="Register Illustration"
        />
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Register karo aur journey start karo
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={form.name}
            placeholder="Enter your name"
            handleChange={handleChange}
            icon={userIcon}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            placeholder="Enter your email"
            handleChange={handleChange}
            icon={emailIcon}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            placeholder="Minimum 6 characters"
            handleChange={handleChange}
            icon={lockIcon}
          />

          <InputField
            label="Confirm Password"
            name="confirm"
            type="password"
            value={form.confirm}
            placeholder="Retype password"
            handleChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            icon={confirmIcon}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register & Get OTP"}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-pink-400 transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

/* 🔥 Reusable Input Component With Icon */
function InputField({
  label,
  name,
  type,
  value,
  placeholder,
  handleChange,
  onKeyDown,
  icon,
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-gray-300 text-sm font-medium">{label}</label>

      <div className="relative">
        {/* Icon */}
        <img
          src={icon}
          alt=""
          className="w-5 h-5 sm:w-6 cursor-pointer object-contain mix-blend-multiply absolute left-3 top-1/2 -translate-y-1/2"
        />

        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          className="
            w-full
            pl-10 pr-4 py-2 rounded-xl
            bg-gray-800
            text-white
            placeholder-gray-500
            border border-gray-700
            focus:outline-none
            focus:ring-2 focus:ring-purple-500
            focus:border-purple-500
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}
