import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Home, About, Services, Contact, Dashboard, AdminDashboard,
  Navigation, Footer, LoginModal, LiveChat 
} from './components';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cryptoPrices, setCryptoPrices] = useState({ btc: 50000, eth: 3000, usdt: 1.00 });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState('signin');

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch crypto prices
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(`${API}/crypto-prices`);
        setCryptoPrices(response.data);
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <AppContent 
          isLoggedIn={isLoggedIn} 
          user={user} 
          setUser={setUser} 
          setIsLoggedIn={setIsLoggedIn}
          isLoginOpen={isLoginOpen} 
          setIsLoginOpen={setIsLoginOpen} 
          loginMode={loginMode} 
          setLoginMode={setLoginMode}
          cryptoPrices={cryptoPrices}
        />
      </div>
    </BrowserRouter>
  );
}

function AppContent({ 
  isLoggedIn, user, setUser, setIsLoggedIn, 
  isLoginOpen, setIsLoginOpen, loginMode, setLoginMode, 
  cryptoPrices 
}) {
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    setUser(userData.user);
    setIsLoggedIn(true);
    localStorage.setItem('token', userData.access_token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.access_token}`;
    setIsLoginOpen(false);
    
    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate('/dashboard');
    }, 100);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  const handleShowLogin = () => {
    setLoginMode('signin');
    setIsLoginOpen(true);
  };

  return (
    <>
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
        <Route path="/" element={
          <Home 
            cryptoPrices={cryptoPrices} 
            user={user}
            onNavigateToDashboard={handleNavigateToDashboard}
            onShowLogin={handleShowLogin}
          />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={
          isLoggedIn ? (
            user?.is_admin ? 
              <AdminDashboard user={user} /> : 
              <Dashboard user={user} cryptoPrices={cryptoPrices} />
          ) : <Home 
                cryptoPrices={cryptoPrices} 
                user={user}
                onNavigateToDashboard={handleNavigateToDashboard}
                onShowLogin={handleShowLogin}
              />
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
    </>
  );
}

export default App;