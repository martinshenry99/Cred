import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigation, Footer, Home } from './components';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cryptoPrices, setCryptoPrices] = useState({ btc: 50000, eth: 3000, usdt: 1.00 });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState('signin');

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
        onLogout={() => {}}
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
        <Route path="/about" element={<div>About page</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;