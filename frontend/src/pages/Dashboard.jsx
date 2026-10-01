import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPortfolios();
  }, [user, navigate]);

  const fetchPortfolios = async () => {
    try {
      const { data } = await api.getPortfolios();
      setPortfolios(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(`[Dashboard] Attempting to delete portfolio with ID: ${id}`);
      await api.deletePortfolio(id);
      console.log(`[Dashboard] Successfully deleted portfolio from backend.`);
      setPortfolios((prev) => {
        const updated = prev.filter((p) => p._id !== id);
        console.log(`[Dashboard] UI State updated. Remaining portfolios: ${updated.length}`);
        return updated;
      });
    } catch (err) {
      console.error('[Dashboard] Error deleting portfolio:', err);
      alert(err.response?.data?.message || 'Failed to delete portfolio. Check console for details.');
    }
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/portfolio/${id}`;

    const copyFallback = () => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          alert('Link copied to clipboard!');
        } else {
          window.prompt('Please copy this link manually:', url);
        }
      } catch (err) {
        console.error('Fallback copy failed', err);
        window.prompt('Please copy this link manually:', url);
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => copyFallback());
    } else {
      copyFallback();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center px-6 py-10"
    >
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="border border-white/10 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h1 className="font-display text-2xl font-black text-white">
              Welcome, <span className="signal-text">{user?.name}</span>
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Manage your portfolios</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/choose-template"
              className="font-display inline-flex px-5 py-2.5 rounded-full pill-outline-cyan text-white font-bold text-sm items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> New Portfolio
            </Link>
          </motion.div>
        </div>

        {/* Portfolio Cards */}
        {portfolios.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl">
            <p className="text-6xl mb-4">📁</p>
            <h3 className="font-display text-lg font-bold text-white mb-2">No portfolios yet</h3>
            <p className="text-gray-400 mb-6 text-sm">Create your first portfolio to get started!</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to="/choose-template"
                className="font-display px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-black text-sm block"
              >
                Create Portfolio
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <motion.div
                key={portfolio._id}
                whileHover={{ y: -4 }}
                className="border border-white/10 rounded-2xl p-6 flex flex-col hover:border-pink-500/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{portfolio.title}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full border border-white/10 text-gray-400 capitalize">
                      {portfolio.template}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{portfolio.bio}</p>

                <div className="flex gap-4 text-xs text-gray-500 mb-6">
                  <span>🛠 {portfolio.skills?.length || 0} skills</span>
                  <span>📂 {portfolio.projects?.length || 0} projects</span>
                  <span>👁️ {portfolio.views ?? 0} views</span>
                </div>

                <div className="mt-auto">
                  <div className="border-t border-white/10 mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/builder/${portfolio._id}`}
                      className="flex-1 text-center py-2 rounded-lg border border-white/10 text-gray-300 hover:border-white/30 text-sm font-semibold transition-colors min-w-[70px]"
                    >
                      ✏️ Edit
                    </Link>
                    <Link
                      to={`/analyzer/${portfolio._id}`}
                      className="flex-1 text-center py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60 text-sm font-semibold transition-colors min-w-[70px]"
                    >
                      📊 Analyze
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleShare(portfolio._id)}
                      className="flex-1 text-center py-2 rounded-lg border border-white/10 text-gray-300 hover:border-white/30 text-sm font-semibold transition-colors min-w-[70px]"
                    >
                      🔗 Share
                    </button>
                    <Link
                      to={`/portfolio/${portfolio._id}`}
                      className="flex-1 text-center py-2 rounded-lg border border-white/10 text-gray-300 hover:border-white/30 text-sm font-semibold transition-colors min-w-[70px]"
                    >
                      👁 View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(portfolio._id)}
                      className="px-3 py-2 rounded-lg border border-red-800 text-red-400 hover:border-red-500 text-sm font-semibold transition-colors flex items-center justify-center shrink-0"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;