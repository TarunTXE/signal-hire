import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import PublicPortfolio from './pages/PublicPortfolio';
import ChooseTemplate from './pages/ChooseTemplate';
import JobPortal from './pages/JobPortal';
import PortfolioAnalyzer from './pages/PortfolioAnalyzer';
import ResumeBuilder from './pages/ResumeBuilder';
import FloatingShapes from './components/FloatingShapes';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col">          
          <FloatingShapes />
          <div className="relative z-10 flex flex-col flex-1">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/choose-template" element={<ChooseTemplate />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/builder/:id" element={<Builder />} />
              <Route path="/portfolio/:id" element={<PublicPortfolio />} />
              <Route path="/analyzer/:id" element={<PortfolioAnalyzer />} />
              <Route path="/jobs" element={<JobPortal />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
                          </Routes>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;