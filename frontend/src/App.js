import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { 
  Home, About, Services, Contact, Dashboard, AdminDashboard,
  Navigation, Footer, Hero, ServicesSection, AboutSection, 
  ContactSection, LoginModal, LiveChat, TestimonialsSection, FAQSection 
} from './components';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState('signin');
  const [cryptoPrices, setCryptoPrices] = useState({ btc: 50000, eth: 3000, usdt: 1 });

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Fetch crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${API}/crypto-prices`);
        setCryptoPrices(response.data.prices);
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (userData) => {
    setUser(userData.user);
    setIsLoggedIn(true);
    localStorage.setItem('token', userData.access_token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.access_token}`;
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation 
          isLoggedIn={isLoggedIn}
          user={user}
          onLogin={(mode = 'signin') => {
            setLoginMode(mode);
            setIsLoginOpen(true);
          }}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home cryptoPrices={cryptoPrices} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={
            isLoggedIn ? (
              user?.is_admin ? 
                <AdminDashboard user={user} /> : 
                <Dashboard user={user} cryptoPrices={cryptoPrices} />
            ) : <Home cryptoPrices={cryptoPrices} />
          } />
        </Routes>
        {!isLoggedIn && <Footer />}
        <LoginModal 
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
          initialMode={loginMode}
        />
        <LiveChat />
      </BrowserRouter>
    </div>
  );
}

export default App;