import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPPage from "./pages/OTPPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

// ─── Route Logger Component ───
function RouteLogger({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  // Log every navigation
  console.log(
    `%c[Router] Navigated to: ${location.pathname}`,
    "color: #7c6ef7; font-weight: bold; font-size: 14px;",
  );

  // Log current user
  console.log(
    `%c[Auth] Current user: ${user ? user.name + " (" + user.email + ")" : "No user logged in"}`,
    "color: #34d399; font-style: italic;",
  );

  return children;
}

// ─── APP COMPONENT ───
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteLogger>
          <Routes>
            {/* ─── PUBLIC ROUTES ─── */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />

            {/* ─── SEMI-PUBLIC (OTP verify - both public and private) ─── */}
            <Route path="/verify-otp" element={<OTPPage />} />

            {/* ─── PROTECTED ROUTES ─── */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />

            {/* ─── DEFAULT REDIRECT ─── */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </RouteLogger>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
