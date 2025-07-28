import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
    otp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (showForgotPassword) {
        // Handle forgot password
        const response = await axios.post(`${API}/forgot-password`, {
          email: formData.email
        });
        
        alert('Password reset instructions have been sent to your email.');
        setShowForgotPassword(false);
        setIsLoginMode(true);
        
      } else if (showOTPVerification) {
        // Verify OTP
        const response = await axios.post(`${API}/verify-otp`, {
          email: formData.email,
          otp: formData.otp
        });
        
        alert('Account verified successfully! You can now login.');
        setShowOTPVerification(false);
        setIsLoginMode(true);
        setFormData({ ...formData, otp: '', password: '', confirmPassword: '' });
        
      } else if (isLoginMode) {
        // Login
        const response = await axios.post(`${API}/login`, {
          email: formData.email,
          password: formData.password
        });
        
        onLogin(response.data);
        
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        const response = await axios.post(`${API}/register`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        
        alert('Registration successful! Please check your email for OTP verification.');
        setShowOTPVerification(true);
      }
    } catch (error) {
      setError(error.response?.data?.detail || error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      confirmPassword: '',
      otp: ''
    });
    setError('');
    setShowOTPVerification(false);
    setShowForgotPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl sm:text-2xl font-bold">🛡️</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {showForgotPassword ? 'Reset Password' : 
             showOTPVerification ? 'Verify OTP' : 
             (isLoginMode ? 'CRED Sign In' : 'Join CRED')}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {showForgotPassword ? (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email to reset password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-2">We'll send reset instructions to this email</p>
              </div>
            </>
          ) : showOTPVerification ? (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Enter OTP</label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
                />
                <p className="text-xs text-gray-500 mt-2">Check your email for the verification code</p>
              </div>
            </>
          ) : (
            <>
              {!isLoginMode && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}
              
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {!isLoginMode && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              )}
              
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              
              {!isLoginMode && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                  <input
                    type="password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              )}
              
              {isLoginMode && (
                <div className="mb-4 text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 mb-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : (
              showForgotPassword ? 'Send Reset Instructions' :
              showOTPVerification ? 'Verify OTP' : 
              (isLoginMode ? 'Sign In to CRED' : 'Join CRED')
            )}
          </button>
        </form>
        
        {!showOTPVerification && (
          <div className="text-center">
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
                setFormData({ ...formData, password: '', confirmPassword: '', name: '', phone: '' });
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              {isLoginMode ? "Don't have an account? Join CRED" : "Already have an account? Sign In"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};