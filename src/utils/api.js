import axios from "axios";

console.log("🌍 Creating Axios API Instance...");

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // <-- ensures credentials (cookies/auth) are sent
});

// ===============================
// 🔐 Request Interceptor
// ===============================
API.interceptors.request.use(
  (config) => {
    console.log("📤 API Request Sent:");
    console.log("➡️ URL:", config.url);
    console.log("➡️ Method:", config.method);
    console.log("➡️ Data:", config.data);

    const token = localStorage.getItem("token");

    if (token) {
      console.log("🔐 Attaching Token to Request");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("⚠️ No Token Found for Request");
    }

    return config;
  },
  (error) => {
    console.log("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// ===============================
// 📥 Response Interceptor
// ===============================
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Response Received:");
    console.log("⬅️ URL:", response.config.url);
    console.log("⬅️ Status:", response.status);
    console.log("⬅️ Data:", response.data);

    return response;
  },
  (error) => {
    console.log("❌ API Response Error:");
    console.log("⬅️ URL:", error.config?.url);
    console.log("⬅️ Status:", error.response?.status);
    console.log("⬅️ Message:", error.response?.data);

    return Promise.reject(error);
  },
);

// ===============================
// 🚀 Auth APIs
// ===============================

export const registerUser = (data) => {
  console.log("📝 Calling Register API:", data);
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  console.log("🔐 Calling Login API:", data);
  return API.post("/auth/login", data);
};

export const getProfile = () => {
  console.log("👤 Calling Get Profile API");
  return API.get("/auth/profile");
};

// -------------------------------
// 📧 Forgot Password / Send OTP
// -------------------------------
export const forgotPassword = async (data) => {
  console.log("📧 Calling Forgot Password API:", data);

  try {
    const response = await API.post("/auth/forgot-password", data);
    console.log("OTP response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    throw error;
  }
};

// -------------------------------
// 🔢 Verify OTP
// -------------------------------
export const verifyOTP = (data) => {
  console.log("🔢 Calling Verify OTP API:", data);
  return API.post("/auth/verify-otp", data);
};

// -------------------------------
// 🔁 Reset Password
// -------------------------------
export const resetPassword = (data) => {
  console.log("🔁 Calling Reset Password API:", data);
  return API.post("/auth/reset-password", data);
};

export default API;
