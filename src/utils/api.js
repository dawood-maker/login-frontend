import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Add token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const verifyOTP = (data) => API.post("/auth/verify-otp", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);

export default API;
