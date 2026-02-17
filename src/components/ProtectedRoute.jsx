import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("ProtectedRoute - Loading:", loading);
    console.log("ProtectedRoute - User:", user);
  }, [loading, user]);

  if (loading) {
    console.log("Showing loading spinner...");

    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-[#2d2d4e] border-t-indigo-600 rounded-full animate-spin"></div>

        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    console.log("User not found. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  console.log("User authenticated. Rendering protected content.");
  return children;
};

export default ProtectedRoute;
