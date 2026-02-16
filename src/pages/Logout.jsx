import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const doLogout = async () => {
      console.log("[Logout] Logging out user...");
      await logout();
      console.log("[Logout] Logout complete. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    };
    doLogout();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-2xl p-6 text-center text-white space-y-4">
        {/* Floating 👋 Emoji */}
        <div className="text-6xl animate-bounce">👋</div>

        {/* Title */}
        <h1 className="text-2xl font-bold">Signing Out...</h1>
        <p className="text-gray-400 text-sm">
          Aapko logout kiya ja raha hai. Thodi der wait karo.
        </p>

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto"></div>

        {/* Login Link */}
        <div className="mt-6">
          <button
            className="text-purple-400 hover:underline font-medium"
            onClick={() => {
              console.log("[Logout] Redirecting manually to login page");
              navigate("/login");
            }}
          >
            Abhi login page par jao →
          </button>
        </div>
      </div>
    </div>
  );
}
