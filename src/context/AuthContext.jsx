import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app start / page refresh — check localStorage for token and fetch user
  useEffect(() => {
    console.log("🔄 AuthProvider Mounted — checking saved session");

    const initAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        console.log("✅ Token found in localStorage");
        try {
          const res = await getProfile();
          console.log("👤 Profile fetched:", res.data.user);
          setUser(res.data.user);
          setToken(savedToken);
        } catch (err) {
          console.log("❌ Token invalid or expired — clearing session");
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } else {
        console.log("⚠️ No saved token found");
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData, authToken) => {
    console.log("🔐 Login called — storing token");
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken); // Persist across refreshes
    console.log("✅ Logged in & token saved to localStorage");
  };

  const logout = () => {
    console.log("🚪 Logout called — clearing session");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token"); // Clear on logout
    console.log("🗑️ Token removed & user cleared");
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
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;