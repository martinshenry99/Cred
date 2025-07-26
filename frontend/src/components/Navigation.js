import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = ({ isLoggedIn, user, onLogin, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  if (isLoggedIn) {
    // Simplified navigation for logged-in users
    return (
      <nav className="bg-slate-800 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-lg sm:text-xl font-bold">🛡️</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold">CRED</span>
                <div className="text-xs text-gray-300 hidden sm:block">Crypto Regulatory Enforcement</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-sm text-gray-300 hidden sm:inline">Welcome, {user?.name}</span>
              <button 
                onClick={onLogout}
                className="bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-red-700 transition duration-300 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  // Full navigation for non-logged-in users
  return (
    <nav className="bg-slate-800 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-lg sm:text-xl font-bold">🛡️</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold">CRED</span>
                <div className="text-xs text-gray-300 hidden sm:block">Crypto Regulatory Enforcement Division</div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/' ? 'text-blue-400' : ''}`}
            >
              HOME
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/about' ? 'text-blue-400' : ''}`}
            >
              ABOUT CRED
            </Link>
            <Link 
              to="/services" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/services' ? 'text-blue-400' : ''}`}
            >
              SERVICES
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/contact' ? 'text-blue-400' : ''}`}
            >
              CONTACT
            </Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
            <button 
              onClick={onLogin}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-400 transition duration-300"
            >
              <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-700 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/' ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                to="/about" 
                className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/about' ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT CRED
              </Link>
              <Link 
                to="/services" 
                className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/services' ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link 
                to="/contact" 
                className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/contact' ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
              <div className="flex space-x-4 pt-4 border-t border-slate-600">
                <button 
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex-1"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex-1"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};