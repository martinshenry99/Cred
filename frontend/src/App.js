import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Simple test components
const TestHome = () => <div><h1>CRED Test Home</h1><p>Basic home page working</p></div>;
const TestAbout = () => <div><h1>About</h1><p>About page working</p></div>;

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

  return (
    <>
      <nav style={{padding: '20px', background: '#333', color: 'white'}}>
        <span>CRED Test Navigation</span>
      </nav>
      <Routes>
        <Route path="/" element={<TestHome />} />
        <Route path="/about" element={<TestAbout />} />
      </Routes>
    </>
  );
}

export default App;