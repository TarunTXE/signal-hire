import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Returns the new portfolio's _id if a guest draft was auto-saved, otherwise null
  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));

    const draftRaw = localStorage.getItem('guestPortfolioDraft');
    if (draftRaw) {
      try {
        const draft = JSON.parse(draftRaw);
        const { data: created } = await api.createPortfolio(draft);
        localStorage.removeItem('guestPortfolioDraft');
        return created._id;
      } catch (err) {
        console.error('Failed to auto-save guest draft:', err);
      }
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const toggleDark = () => setDarkMode((prev) => !prev);

  return (
    <AuthContext.Provider value={{ user, login, logout, darkMode, toggleDark }}>
      {children}
    </AuthContext.Provider>
  );
};