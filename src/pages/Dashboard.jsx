import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [tab, setTab] = useState("profile"); // profile | changePass | changeEmail

  // Change Password
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  // Change Email
  const [emailForm, setEmailForm] = useState({ newEmail: "" });
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // ─── CHANGE PASSWORD ────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    console.log("[Dashboard] Attempting to change password...");
    const { currentPassword, newPassword, confirm } = passForm;
    if (!currentPassword || !newPassword || !confirm)
      return setPassError("Please fill all fields.");
    if (newPassword !== confirm)
      return setPassError("New passwords do not match.");
    if (newPassword.length < 6)
      return setPassError("Password must be at least 6 characters.");

    setPassLoading(true);
    setPassError("");
    setPassSuccess("");
    try {
      const res = await authAPI.changePassword({
        currentPassword,
        newPassword,
      });
      console.log("[Dashboard] Password changed:", res.data);
      setPassSuccess(res.data.message);
      setPassForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      console.error("[Dashboard] Password change error:", err);
      setPassError(err.response?.data?.message || "Password change failed.");
    } finally {
      setPassLoading(false);
    }
  };

  // ─── CHANGE EMAIL ───────────────────────────────────────────────────────────
  const handleChangeEmail = async () => {
    console.log("[Dashboard] Requesting email change to:", emailForm.newEmail);
    if (!emailForm.newEmail) return setEmailError("Please enter new email.");
    if (emailForm.newEmail === user?.email)
      return setEmailError("Yeh aapka current email hai.");

    setEmailLoading(true);
    setEmailError("");
    setEmailSuccess("");
    try {
      await authAPI.changeEmailReq({ newEmail: emailForm.newEmail });
      console.log("[Dashboard] Email change OTP sent.");
      navigate("/verify-otp", {
        state: { email: emailForm.newEmail, purpose: "change_email" },
      });
    } catch (err) {
      console.error("[Dashboard] Email change error:", err);
      setEmailError(
        err.response?.data?.message || "Email change request failed.",
      );
    } finally {
      setEmailLoading(false);
    }
  };

  // ─── LOGOUT ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    console.log("[Dashboard] Logging out...");
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">👋 Hello, {user?.name}!</h1>
            <p className="text-gray-400 text-sm mt-1">
              Aapka account dashboard
            </p>
          </div>
          <button
            className="bg-transparent border border-purple-600 hover:bg-purple-600 hover:text-white transition px-4 py-2 rounded-md font-medium"
            onClick={handleLogout}
          >
            Logout 🚪
          </button>
        </div>

        {/* NAV TABS */}
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          {[
            { key: "profile", label: "👤 Profile" },
            { key: "changePass", label: "🔒 Password" },
            { key: "changeEmail", label: "📧 Email" },
          ].map((t) => (
            <button
              key={t.key}
              className={`px-3 py-2 rounded-md font-medium transition ${
                tab === t.key
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── PROFILE TAB ─── */}
        {tab === "profile" && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>👤 Name</span>
              <span className="font-semibold">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>📧 Email</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>✅ Status</span>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                Verified
              </span>
            </div>
            <div className="flex justify-between border-b-0 items-center">
              <span>🪪 User ID</span>
              <span className="text-gray-400 text-xs font-mono">
                {user?.id}
              </span>
            </div>

            <button
              className="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md font-medium"
              onClick={handleLogout}
            >
              🚪 Sign Out
            </button>
          </div>
        )}

        {/* ─── CHANGE PASSWORD TAB ─── */}
        {tab === "changePass" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">🔒 Password Badlo</h2>
            {passError && (
              <div className="bg-red-600 text-white px-3 py-2 rounded-md">
                {passError}
              </div>
            )}
            {passSuccess && (
              <div className="bg-green-600 text-white px-3 py-2 rounded-md">
                {passSuccess}
              </div>
            )}

            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              placeholder="Current Password"
              value={passForm.currentPassword}
              onChange={(e) =>
                setPassForm((p) => ({ ...p, currentPassword: e.target.value }))
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="password"
                placeholder="New Password"
                value={passForm.newPassword}
                onChange={(e) =>
                  setPassForm((p) => ({ ...p, newPassword: e.target.value }))
                }
              />
              <input
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="password"
                placeholder="Confirm New"
                value={passForm.confirm}
                onChange={(e) =>
                  setPassForm((p) => ({ ...p, confirm: e.target.value }))
                }
              />
            </div>
            <button
              className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-md font-medium disabled:opacity-50"
              onClick={handleChangePassword}
              disabled={passLoading}
            >
              {passLoading ? "Changing..." : "Change Password ✓"}
            </button>
          </div>
        )}

        {/* ─── CHANGE EMAIL TAB ─── */}
        {tab === "changeEmail" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">📧 Email Badlo</h2>
            <div className="bg-blue-600 text-white px-3 py-2 rounded-md">
              ℹ️ Current email: <strong>{user?.email}</strong> <br />
              OTP naye email par jayega verification ke liye.
            </div>
            {emailError && (
              <div className="bg-red-600 text-white px-3 py-2 rounded-md">
                {emailError}
              </div>
            )}
            {emailSuccess && (
              <div className="bg-green-600 text-white px-3 py-2 rounded-md">
                {emailSuccess}
              </div>
            )}

            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              placeholder="New Email Address"
              value={emailForm.newEmail}
              onChange={(e) => setEmailForm({ newEmail: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleChangeEmail()}
            />
            <button
              className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-md font-medium disabled:opacity-50"
              onClick={handleChangeEmail}
              disabled={emailLoading}
            >
              {emailLoading ? "Sending OTP..." : "Send Verification OTP 📨"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
