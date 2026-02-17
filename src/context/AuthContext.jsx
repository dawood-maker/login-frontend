import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 AuthProvider Mounted");

    const initAuth = async () => {
      console.log("🔍 Checking saved token...");

      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        console.log("✅ Token Found in localStorage:", savedToken);

        try {
          const res = await getProfile();
          console.log("👤 Profile Fetched Successfully:", res.data.user);

          setUser(res.data.user);
          setToken(savedToken);
        } catch (err) {
          console.log("❌ Profile Fetch Failed:", err.response?.data);

          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } else {
        console.log("⚠️ No Token Found");
      }

      setLoading(false);
      console.log("✅ Auth Initialization Complete");
    };

    initAuth();
  }, []);

  const login = (userData, authToken) => {
    console.log("🔐 Login Function Called");
    console.log("User Data:", userData);
    console.log("Token:", authToken);

    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);

    console.log("✅ User Logged In & Token Stored");
  };

  const logout = () => {
    console.log("🚪 Logout Function Called");

    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    console.log("🗑️ Token Removed & User Cleared");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log("❌ useAuth used outside AuthProvider");
    throw new Error("useAuth must be used within AuthProvider");
  }

  console.log("📡 useAuth Hook Accessed");
  return context;
};

export default AuthContext;
