import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Loader component — Tailwind CSS spinner
  const Loader = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-16 h-16 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin shadow-lg"></div>
    </div>
  );

  // App load hone par user check karo
  useEffect(() => {
    console.log("[Auth] Checking local storage for user...");
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      console.log("[Auth] User found in localStorage:", JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    } else {
      console.log("[Auth] No user found in localStorage");
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    console.log("[Auth] Logging in user:", userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    console.log("[Auth] Logging out user...");
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("[Auth] Logout API error:", err);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData) => {
    console.log("[Auth] Updating user data:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  if (loading) return <Loader />; // Loading ke time full screen loader

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
