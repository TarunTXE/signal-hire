import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
      errors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number and special character';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const { data } = await api.loginUser({ email, password });
      const savedPortfolioId = await login(data);
      navigate(savedPortfolioId ? `/builder/${savedPortfolioId}` : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full bg-white/5 border rounded-lg px-3 py-2.5 focus:ring-2 focus:outline-none transition-all text-white placeholder-gray-500';
  const inputNormal = inputBase + ' border-white/10 focus:ring-cyan-400';
  const inputError = inputBase + ' border-red-500 focus:ring-red-500';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-white/10 rounded-2xl p-8"
      >
        <h2 className="font-display text-3xl font-black text-center signal-text mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Sign in to your account</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-900/20 text-red-400 text-sm text-center border border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: '' })); }}
              className={fieldErrors.email ? inputError : inputNormal}
              placeholder="you@example.com"
            />
            {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: '' })); }}
              className={fieldErrors.password ? inputError : inputNormal}
              placeholder="••••••••"
            />
            {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="font-display w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-black transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="border-t border-white/10 mt-6 pt-6">
          <p className="text-center text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;