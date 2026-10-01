import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const checks = [
  'Resume to portfolio, instantly',
  'Build fast, look sharp',
  'One link, every recruiter',
];

const features = [
  { icon: '🪄', title: 'AI Resume Import', desc: 'Upload a PDF, get a structured profile in seconds.' },
  { icon: '🎨', title: 'Portfolio Builder', desc: '7 professional templates, fully customizable.' },
  { icon: '📄', title: 'Resume Builder', desc: '5 ATS-friendly formats — Classic to Creative.' },
  { icon: '💼', title: 'Job Portal', desc: 'Remote jobs in India, matched to your skills.' },
  { icon: '📥', title: 'PDF Export', desc: 'Download a clean, print-ready A4 PDF anytime.' },
  { icon: '🩺', title: 'Medical & Academic', desc: 'Templates built for doctors, researchers, more.' },
  { icon: '🔐', title: 'Secure Auth', desc: 'JWT-based login keeps your data private.' },
];

const Home = () => {
  const { user } = useAuth();

  return (
        <div className="flex flex-col">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center py-16 px-6"
      >
        <div className="text-center max-w-4xl">
                    <h1 className="font-display text-5xl sm:text-7xl font-black leading-[1.05] signal-text">
            Resume. Portfolio.<br />Job Search. Done.
          </h1>
              <p className="mt-6 text-lg sm:text-xl text-cyan-300 max-w-2xl mx-auto leading-relaxed">
            Signal Hire turns a single resume into a polished portfolio, an ATS-ready resume,
            and your next job search — all in one place.
          </p>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            {user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/dashboard" className="inline-block px-8 py-4 rounded-full pill-outline-cyan text-white font-bold text-lg">
                  Go to Dashboard
                </Link>
              </motion.div>
                        ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/register" className="inline-block px-8 py-4 rounded-full pill-outline-cyan text-white font-bold text-lg">
                    Get Started Free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/choose-template" className="inline-block px-8 py-4 rounded-full text-gray-300 font-bold text-lg hover:text-white transition-colors">
                    Try Without Signing Up →
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {checks.map((c, i) => (
              <div key={i} className="check-item">
                <span className="check-circle">
                  <svg className="w-3 h-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-cyan-300 font-semibold text-sm sm:text-base">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

            {/* Feature grid — static, lifts on hover */}
      <section className="max-w-6xl mx-auto px-6 pb-16 pt-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, borderColor: 'rgba(236,72,153,0.5)' }}
              className="border border-white/10 rounded-xl px-5 py-4 flex items-center gap-3 cursor-default"
            >
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h3 className="font-display text-sm font-bold text-white">{f.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;