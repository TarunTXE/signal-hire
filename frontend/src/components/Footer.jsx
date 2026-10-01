import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between flex-wrap gap-3">
       <Link to="/" className="font-display text-lg font-black tracking-tight">
          <span className="signal-text">SIGNAL</span> <span className="text-white">HIRE</span>
        </Link>
        <p className="text-xs text-gray-500">© 2026 Signal Hire — Built by Tarun Harish E</p>
      </div>
    </footer>
  );
};

export default Footer;