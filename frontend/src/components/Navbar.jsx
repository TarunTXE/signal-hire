import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

    const linkClass = 'font-display text-sm font-bold text-gray-300 hover:text-white transition-colors';

  return (
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="font-display text-xl font-black tracking-tight">
              <span className="signal-text">SIGNAL</span> <span className="text-white">HIRE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className={linkClass}>Jobs</Link>
            <Link to="/resume-builder" className={linkClass}>Resume</Link>
            {user ? (
              <>
                <Link to="/dashboard" className={linkClass}>Dashboard</Link>
                <button onClick={handleLogout} className="font-display px-5 py-2 text-sm font-black rounded-full pill-outline-cyan text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClass}>Login</Link>
                <Link to="/register" className="font-display px-5 py-2 text-sm font-black rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setMenuOpen((o) => !o)} className="md:hidden text-gray-300 p-2" aria-label="Toggle menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              <Link to="/jobs" className={linkClass} onClick={() => setMenuOpen(false)}>Jobs</Link>
              <Link to="/resume-builder" className={linkClass} onClick={() => setMenuOpen(false)}>Resume</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <button onClick={handleLogout} className="font-display px-5 py-2 text-sm font-black rounded-full pill-outline-cyan text-white text-left">
                    Logout
                  </button>
                </>
              ) : (
                              <>
                <Link to="/choose-template" className={linkClass}>Try Free</Link>
                <Link to="/login" className={linkClass}>Login</Link>
                <Link to="/register" className="font-display px-5 py-2 text-sm font-black rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black">
                  Get Started
                </Link>
              </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;