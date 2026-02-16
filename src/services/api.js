import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Har request mein token automatically add karo
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response error handle karo
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Token expire — logout karo
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// ─── AUTH API FUNCTIONS ────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  verifyOTP: (data) => API.post("/auth/verify-otp", data),
  resendOTP: (data) => API.post("/auth/resend-otp", data),
  login: (data) => API.post("/auth/login", data),
  logout: () => API.post("/auth/logout"),
  getMe: () => API.get("/auth/me"),
  forgotPassword: (data) => API.post("/auth/forgot-password", data),
  verifyForgotOTP: (data) => API.post("/auth/verify-forgot-otp", data),
  resetPassword: (data) => API.post("/auth/reset-password", data),
  changePassword: (data) => API.put("/auth/change-password", data),
  changeEmailReq: (data) => API.post("/auth/change-email-request", data),
  changeEmailVerify: (data) => API.post("/auth/change-email-verify", data),
};

export default API;
