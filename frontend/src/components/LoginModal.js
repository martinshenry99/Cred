import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const LoginModal = ({ isOpen, onClose, onLogin, initialMode = 'signin' }) => {
  const [isLoginMode, setIsLoginMode] = useState(initialMode === 'signin');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
    otp: '',
    newPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset mode when initialMode changes
  useEffect(() => {
    setIsLoginMode(initialMode === 'signin');
  }, [initialMode]);

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
        
        alert('Password reset instructions have been sent to your email. Please check your email for the OTP.');
        setShowForgotPassword(false);
        setShowPasswordReset(true);
        
      } else if (showPasswordReset) {
        // Handle password reset with OTP
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        
        const response = await axios.post(`${API}/reset-password`, {
          email: formData.email,
          otp: formData.otp,
          new_password: formData.newPassword
        });
        
        alert('Password reset successful! You can now login with your new password.');
        setShowPasswordReset(false);
        setIsLoginMode(true);
        setFormData({ 
          email: formData.email, 
          password: '', 
          name: '', 
          phone: '', 
          confirmPassword: '', 
          otp: '', 
          newPassword: '' 
        });
        
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
      otp: '',
      newPassword: ''
    });
    setError('');
    setShowOTPVerification(false);
    setShowForgotPassword(false);
    setShowPasswordReset(false);
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
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${
            showForgotPassword ? 'bg-orange-600' :
            showPasswordReset ? 'bg-green-600' :
            showOTPVerification ? 'bg-purple-600' :
            isLoginMode ? 'bg-blue-600' : 'bg-green-600'
          }`}>
            <span className="text-white text-xl sm:text-2xl font-bold">
              {showForgotPassword ? '🔑' :
               showPasswordReset ? '🔒' :
               showOTPVerification ? '📧' :
               isLoginMode ? '🛡️' : '✨'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {showForgotPassword ? 'Reset Password' : 
             showPasswordReset ? 'Create New Password' :
             showOTPVerification ? 'Verify OTP' : 
             (isLoginMode ? 'CRED Sign In' : 'Join CRED Team')}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {showForgotPassword ? 'Enter your email to receive reset instructions' :
             showPasswordReset ? 'Enter OTP and create a new secure password' :
             showOTPVerification ? 'Check your email for the verification code' :
             isLoginMode ? 'Access your secure CRED dashboard' : 'Become a member of the crypto enforcement community'}
          </p>
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
          ) : showPasswordReset ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">OTP Code</label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  placeholder="Enter OTP from email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
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
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}
              
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={isLoginMode ? "Enter your email" : "Enter your email address"}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                    isLoginMode ? 'focus:ring-blue-500' : 'focus:ring-green-500'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {!isLoginMode && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">For urgent case notifications</p>
                </div>
              )}
              
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder={isLoginMode ? "Enter your password" : "Create a secure password"}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                    isLoginMode ? 'focus:ring-blue-500' : 'focus:ring-green-500'
                  }`}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {!isLoginMode && (
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with numbers and letters</p>
                )}
              </div>
              
              {!isLoginMode && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm your password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              
              {!isLoginMode && (
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-green-600 hover:text-green-800">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-800">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 mb-4 disabled:opacity-50 ${
              showForgotPassword ? 'bg-orange-600 hover:bg-orange-700 text-white' :
              showPasswordReset ? 'bg-green-600 hover:bg-green-700 text-white' :
              showOTPVerification ? 'bg-purple-600 hover:bg-purple-700 text-white' :
              isLoginMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSubmitting ? 'Processing...' : (
              showForgotPassword ? 'Send Reset Instructions' :
              showPasswordReset ? 'Reset Password' :
              showOTPVerification ? 'Verify OTP' : 
              (isLoginMode ? 'Sign In to CRED' : 'Create CRED Account')
            )}
          </button>
        </form>
        
        {!showOTPVerification && !showForgotPassword && !showPasswordReset && (
          <div className="text-center">
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
                setFormData({ ...formData, password: '', confirmPassword: '', name: '', phone: '' });
              }}
              className={`font-semibold text-sm transition duration-300 ${
                isLoginMode ? 'text-green-600 hover:text-green-800' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              {isLoginMode ? "New to CRED? Create Account" : "Already a member? Sign In"}
            </button>
            {!isLoginMode && (
              <p className="text-xs text-gray-500 mt-2">
                Join thousands of professionals in crypto enforcement
              </p>
            )}
          </div>
        )}
        
        {showForgotPassword && (
          <div className="text-center">
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setError('');
                setFormData({ ...formData, email: '' });
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              Back to Sign In
            </button>
          </div>
        )}
        
        {showPasswordReset && (
          <div className="text-center">
            <button
              onClick={() => {
                setShowPasswordReset(false);
                setShowForgotPassword(true);
                setError('');
                setFormData({ ...formData, otp: '', newPassword: '', confirmPassword: '' });
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              Back to Email Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};