import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setError('');
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log('[Login] Attempting login with email:', form.email);
    if (!form.email || !form.password) return setError('Please enter email and password.');

    setLoading(true);
    try {
      const res = await authAPI.login(form);
      console.log('[Login] Login successful:', res.data.user);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      console.error('[Login] Login error:', data || err);
      if (data?.needsVerification) {
        navigate('/verify-otp', {
          state: { email: form.email, purpose: 'register' }
        });
      } else {
        setError(data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-5 text-white">
        {/* Icon */}
        <div className="text-5xl text-purple-500 text-center animate-bounce">🔐</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center text-sm">Apne account mein login karo</p>

        {/* Alerts */}
        {error && <div className="bg-red-600 text-white px-3 py-2 rounded-md">{error}</div>}

        {/* Email Input */}
        <div className="flex flex-col space-y-1">
          <label className="text-gray-300 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col space-y-1 relative">
          <label className="text-gray-300 font-medium">Password</label>
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full px-3 py-2 pr-12 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowPass(p => !p)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPass ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right text-sm text-purple-400 hover:underline">
          <Link to="/forgot-password">Password bhool gaye?</Link>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex justify-center items-center bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login →'
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center text-gray-400 my-2">ya</div>

        {/* Register Link */}
        <div className="text-center text-gray-400 text-sm">
          Account nahi hai?{' '}
          <Link className="text-purple-400 hover:underline" to="/register">
            Register karo
          </Link>
        </div>
      </div>
    </div>
  );
}