import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Loading Spinner Component
function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
    </div>
  );
}

// Protected route — sirf logged in users ke liye
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return user ? children : <Navigate to="/login" replace />;
}

// Public route — logged in users ko dashboard bhejo
export function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return !user ? children : <Navigate to="/dashboard" replace />;
}
