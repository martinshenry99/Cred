import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LiveChat } from './Chat';
import { OverviewSection } from './OverviewSection';
import { DepositSection } from './DepositSection';
import { WithdrawSection } from './WithdrawSection';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Dashboard = ({ user, cryptoPrices }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userReports, setUserReports] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [reportsRes, investmentsRes] = await Promise.all([
        axios.get(`${API}/reports/my-reports`),
        axios.get(`${API}/investment/my-investments`)
      ]);
      
      setUserReports(reportsRes.data.reports);
      setInvestments(investmentsRes.data.investments);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <span className="text-white text-2xl font-bold">🛡️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mt-1">CRED Elite Member • {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white text-center shadow-lg">
                <div className="text-2xl font-bold">${user.total_investment?.toLocaleString() || '0'}</div>
                <div className="text-sm opacity-90">Total Investment</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white text-center shadow-lg">
                <div className="text-2xl font-bold">{userReports.length || 0}</div>
                <div className="text-sm opacity-90">Active Reports</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white text-center shadow-lg">
                <div className="text-2xl font-bold">{investments.length || 0}</div>
                <div className="text-sm opacity-90">Investments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'deposit', label: 'Deposit', icon: '💰' },
                { id: 'investments', label: 'Investments', icon: '📈' },
                { id: 'reports', label: 'Reports', icon: '📋' },
                { id: 'profile', label: 'Profile', icon: '👤' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && <OverviewSection user={user} userReports={userReports} investments={investments} cryptoPrices={cryptoPrices} />}
            {activeTab === 'deposit' && <DepositSection />}
            {activeTab === 'investments' && <InvestmentDashboard user={user} cryptoPrices={cryptoPrices} />}
            {activeTab === 'reports' && <ReportSubmissionForm onSubmit={fetchUserData} />}
            {activeTab === 'profile' && <ProfileSection user={user} />}
          </div>
        </div>
      </div>
      
      <LiveChat />
    </div>
  );
};

// Modern Overview Section
const OverviewSection = ({ user, userReports, investments, cryptoPrices }) => {
  const totalInvestment = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalReturns = investments.reduce((sum, inv) => sum + (inv.returns || 0), 0);
  const activeReports = userReports.filter(r => r.status !== 'completed').length;

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to CRED Elite Dashboard</h2>
        <p className="text-blue-100">Manage your investments, track investigations, and access premium features</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalInvestment.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">+12.5% this month</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Returns</p>
              <p className="text-2xl font-bold text-gray-900">${totalReturns.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📈</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-600">+8.2% yield</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Reports</p>
              <p className="text-2xl font-bold text-gray-900">{activeReports}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">📋</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-orange-600">{userReports.length} total</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Member Status</p>
              <p className="text-2xl font-bold text-gray-900">Elite</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-purple-600">Premium access</div>
        </div>
      </div>

      {/* Live Crypto Prices */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Crypto Prices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Bitcoin</div>
                <div className="text-2xl font-bold">${cryptoPrices.btc?.toLocaleString() || '50,000'}</div>
              </div>
              <div className="text-3xl">₿</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Ethereum</div>
                <div className="text-2xl font-bold">${cryptoPrices.eth?.toLocaleString() || '3,000'}</div>
              </div>
              <div className="text-3xl">Ξ</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Tether</div>
                <div className="text-2xl font-bold">${cryptoPrices.usdt?.toFixed(2) || '1.00'}</div>
              </div>
              <div className="text-3xl">₮</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Investments</h3>
          <div className="space-y-4">
            {investments.slice(0, 3).map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{investment.package_name}</div>
                  <div className="text-sm text-gray-500">${investment.amount?.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600">+{investment.returns || 0}%</div>
                  <div className="text-xs text-gray-500">{investment.crypto_type?.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {userReports.slice(0, 3).map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{report.title}</div>
                  <div className="text-sm text-gray-500">{report.category}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    report.status === 'completed' ? 'bg-green-100 text-green-800' :
                    report.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Deposit Section
const DepositSection = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [depositAmount, setDepositAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const cryptoOptions = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      address: 'bc1qcr3nkt4aq3zdpc8tp3nuyteu4v5ayz2pllp99j',
      color: 'from-orange-500 to-yellow-500',
      network: 'Bitcoin Network'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      address: '0x52CF4b2A2398a83F761d3f3C81e79e64BAb9b43d',
      color: 'from-blue-500 to-purple-500',
      network: 'Ethereum Network'
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      address: 'TP9cjBbFXXX4JSkGgcBLsjvRZ9VjA55zTG',
      color: 'from-green-500 to-emerald-500',
      network: 'Tron Network'
    }
  ];

  const selectedCryptoData = cryptoOptions.find(c => c.id === selectedCrypto);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  const handleDeposit = async () => {
    if (!depositAmount) {
      alert('Please enter deposit amount');
      return;
    }

    try {
      await axios.post(`${API}/deposits/create`, {
        amount: parseFloat(depositAmount),
        crypto_type: selectedCrypto,
        address: selectedCryptoData.address
      });
      
      alert('Deposit request created! Please send the crypto to the provided address.');
      setDepositAmount('');
    } catch (error) {
      alert('Failed to create deposit request: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">💰 Crypto Deposit</h2>
        <p className="text-green-100">Deposit cryptocurrency to your CRED account for investments</p>
      </div>

      {/* Crypto Selection */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Cryptocurrency</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCrypto === crypto.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${crypto.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <span className="text-white text-2xl font-bold">{crypto.icon}</span>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{crypto.name}</div>
                <div className="text-sm text-gray-500">{crypto.symbol}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deposit Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit Form */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Amount</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount in USD"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Network:</span>
                <span className="text-sm font-medium text-gray-900">{selectedCryptoData.network}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cryptocurrency:</span>
                <span className="text-sm font-medium text-gray-900">{selectedCryptoData.name}</span>
              </div>
            </div>

            <button
              onClick={handleDeposit}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Create Deposit Request
            </button>
          </div>
        </div>

        {/* Address & QR Code */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Address</h3>
          
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${selectedCryptoData.color} rounded-lg p-4 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">{selectedCryptoData.name} Address</span>
                <span className="text-2xl">{selectedCryptoData.icon}</span>
              </div>
              <div className="font-mono text-sm break-all bg-white bg-opacity-20 rounded p-2">
                {selectedCryptoData.address}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(selectedCryptoData.address)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                📋 Copy Address
              </button>
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                📱 QR Code
              </button>
            </div>

            {showQR && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">QR Code</span>
                </div>
                <p className="text-sm text-gray-600">Scan to get deposit address</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Important Deposit Instructions</h3>
        <div className="space-y-2 text-sm text-yellow-700">
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Only send {selectedCryptoData.name} to this address</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Minimum deposit: $100 USD equivalent</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Deposits are processed within 1-6 confirmations</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Contact support if your deposit doesn't appear within 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const ReportSubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'fraud',
    priority: 'medium'
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('priority', formData.priority);
      
      attachments.forEach(file => {
        submitData.append('attachments', file);
      });

      const response = await axios.post(`${API}/reports/submit`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Report submitted successfully! Our investigation team will review it within 24 hours.');
      setFormData({ title: '', description: '', category: 'fraud', priority: 'medium' });
      setAttachments([]);
      onSubmit();
    } catch (error) {
      alert('Failed to submit report: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📋 Submit Investigation Report</h2>
        <p className="text-red-100">Report crypto crimes and request professional investigation</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fraud">Crypto Fraud</option>
                <option value="scam">Investment Scam</option>
                <option value="theft">Asset Theft</option>
                <option value="ransomware">Ransomware</option>
                <option value="exchange">Exchange Issues</option>
                <option value="romance">Romance Scam</option>
                <option value="phishing">Phishing Attack</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the incident"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
            <textarea
              rows="6"
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide detailed information about the incident, including dates, amounts, wallet addresses, transaction hashes, and any other relevant details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onChange={(e) => setAttachments(Array.from(e.target.files))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB each)
            </p>
            {attachments.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected files:</p>
                <ul className="text-xs text-gray-500">
                  {attachments.map((file, index) => (
                    <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Report...' : 'Submit Investigation Report'}
          </button>
        </form>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">📧 What happens next?</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Your report is immediately sent to our investigation team</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>You'll receive email confirmation within minutes</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Our team will review and respond within 24 hours</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Track progress and communicate through this dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Investment Dashboard with 60-day terms and crypto payments
export const InvestmentDashboard = ({ user, cryptoPrices }) => {
  const [packages, setPackages] = useState([]);
  const [userInvestments, setUserInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchInvestmentData();
  }, []);

  const fetchInvestmentData = async () => {
    try {
      const [packagesRes, investmentsRes] = await Promise.all([
        axios.get(`${API}/investment/packages`),
        axios.get(`${API}/investment/my-investments`)
      ]);
      
      setPackages(packagesRes.data);
      setUserInvestments(investmentsRes.data.investments);
    } catch (error) {
      console.error('Failed to fetch investment data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading investment data...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Investment Packages</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">All packages feature 60-day terms with guaranteed high APY returns</p>
        </div>
        <div className="text-left sm:text-right mt-4 sm:mt-0">
          <div className="text-lg sm:text-xl font-bold text-green-600">Available Balance</div>
          <div className="text-xl sm:text-2xl font-bold text-green-600">$500,000</div>
        </div>
      </div>

      {/* Live Crypto Prices moved here */}
      <div className="mb-8 bg-slate-900 text-white rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-4">Live Crypto Prices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">₿</div>
            <div className="text-lg font-bold text-orange-400">Bitcoin</div>
            <div className="text-xl font-bold">${cryptoPrices.btc?.toLocaleString() || '50,000'}</div>
            <div className="text-sm text-gray-400">BTC/USD</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">Ξ</div>
            <div className="text-lg font-bold text-blue-400">Ethereum</div>
            <div className="text-xl font-bold">${cryptoPrices.eth?.toLocaleString() || '3,000'}</div>
            <div className="text-sm text-gray-400">ETH/USD</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">₮</div>
            <div className="text-lg font-bold text-green-400">Tether</div>
            <div className="text-xl font-bold">${cryptoPrices.usdt?.toFixed(2) || '1.00'}</div>
            <div className="text-sm text-gray-400">USDT/USD</div>
          </div>
        </div>
      </div>

      {/* Investment Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {packages.packages?.map(pkg => (
          <div key={pkg.id} className={`bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ${pkg.premium ? 'ring-4 ring-yellow-400 relative' : ''}`}>
            {pkg.premium && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                ⭐ PREMIUM
              </div>
            )}
            <div className="p-4 sm:p-6">
              <h3 className={`text-lg sm:text-xl font-bold mb-3 ${pkg.premium ? 'text-yellow-600' : 'text-gray-900'}`}>
                {pkg.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Min. Investment:</span>
                  <span className="font-semibold">${pkg.min_investment.toLocaleString()}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">APY:</span>
                  <span className={`font-bold text-lg ${pkg.premium ? 'text-yellow-600' : 'text-green-600'}`}>
                    {pkg.apy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{pkg.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedPackage(pkg);
                  setShowInvestModal(true);
                }}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                  pkg.premium 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg' 
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                {pkg.premium ? '🔥 INVEST ELITE' : 'Invest Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Investments */}
      {userInvestments.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">My Investments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Package</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">APY</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Returns</th>
                </tr>
              </thead>
              <tbody>
                {userInvestments.map(investment => (
                  <tr key={investment._id} className="border-b">
                    <td className="py-3">{investment.package_name}</td>
                    <td className="py-3">${investment.amount.toLocaleString()}</td>
                    <td className="py-3">{investment.apy}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        investment.status === 'active' ? 'bg-green-100 text-green-800' :
                        investment.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {investment.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-green-600 font-semibold">
                      ${investment.returns?.toLocaleString() || '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Investment Modal */}
      {showInvestModal && (
        <InvestmentModal 
          package={selectedPackage}
          cryptoAddresses={packages.crypto_addresses}
          cryptoPrices={cryptoPrices}
          onClose={() => setShowInvestModal(false)}
          onSuccess={() => {
            setShowInvestModal(false);
            fetchInvestmentData();
          }}
        />
      )}
    </div>
  );
};

// Investment Modal with Crypto Payment
const InvestmentModal = ({ package: pkg, cryptoAddresses, cryptoPrices, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: pkg.min_investment,
    crypto_type: 'btc',
    transaction_hash: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/investment/invest`, {
        package_id: pkg.id,
        amount: formData.amount,
        crypto_type: formData.crypto_type,
        transaction_hash: formData.transaction_hash
      });

      alert('Investment submitted successfully! Our team will verify your transaction within 24 hours.');
      onSuccess();
    } catch (error) {
      alert('Investment failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCryptoAmount = () => {
    const price = cryptoPrices[formData.crypto_type] || 1;
    return (formData.amount / price).toFixed(8);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Invest in {pkg.name}
        </h2>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Package Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">APY:</span>
              <span className="font-bold text-blue-900 ml-2">{pkg.apy}</span>
            </div>
            <div>
              <span className="text-blue-700">Duration:</span>
              <span className="font-bold text-blue-900 ml-2">60 days</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Investment Amount (USD)</label>
            <input
              type="number"
              required
              min={pkg.min_investment}
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum: ${pkg.min_investment.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
            <select
              value={formData.crypto_type}
              onChange={(e) => setFormData({...formData, crypto_type: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt">Tether (USDT)</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Payment Instructions</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Amount to Send:</span>
                <div className="font-mono text-lg font-bold text-green-600">
                  {getCryptoAmount()} {formData.crypto_type.toUpperCase()}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Send to Address:</span>
                <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                  {cryptoAddresses[formData.crypto_type]}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Transaction Hash</label>
            <input
              type="text"
              required
              placeholder="Enter transaction hash after sending payment"
              value={formData.transaction_hash}
              onChange={(e) => setFormData({...formData, transaction_hash: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Copy the transaction hash from your wallet after sending the payment
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Send exact amount to the provided address</li>
              <li>• Network fees are separate from investment amount</li>
              <li>• Verification takes 1-24 hours after payment</li>
              <li>• Returns start immediately after verification</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Investment...' : 'Submit Investment'}
          </button>
        </form>
      </div>
    </div>
  );
};

// User Reports Component
const UserReports = ({ reports, onUpdate }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleReply = async (reportId) => {
    if (!replyMessage.trim()) return;

    setIsSubmittingReply(true);
    try {
      await axios.post(`${API}/reports/reply`, {
        report_id: reportId,
        message: replyMessage
      });

      alert('Reply sent successfully!');
      setReplyMessage('');
      onUpdate();
    } catch (error) {
      alert('Failed to send reply: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsSubmittingReply(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">My Investigation Reports</h2>
      
      {reports.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">📋</div>
          <p>No reports submitted yet.</p>
          <p className="text-sm">Submit your first investigation report using the "Submit Report" tab.</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {reports.map(report => (
            <div key={report._id} className="bg-white border rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div className="flex-1 mb-4 sm:mb-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">{report.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                    <span>Category: {report.category}</span>
                    <span>Priority: {report.priority}</span>
                    <span>Submitted: {new Date(report.created_at).toLocaleDateString()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      report.status === 'completed' ? 'bg-green-100 text-green-800' :
                      report.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedReport(selectedReport === report._id ? null : report._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                >
                  {selectedReport === report._id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {selectedReport === report._id && (
                <div className="border-t pt-4 mt-4">
                  {report.conversation && report.conversation.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Conversation History</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {report.conversation.map(msg => (
                          <div key={msg.id} className={`p-3 rounded-lg ${
                            msg.sender === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-semibold text-sm">
                                {msg.sender === 'user' ? 'You' : 'CRED Team'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(msg.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Reply to Investigation Team</h4>
                    <textarea
                      rows="3"
                      placeholder="Type your reply here..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => handleReply(report._id)}
                      disabled={isSubmittingReply || !replyMessage.trim()}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 text-sm"
                    >
                      {isSubmittingReply ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Profile Section
const ProfileSection = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '+1 (555) CRED-911',
    notifications: true,
    twoFactor: true
  });

  const handleSave = () => {
    setEditMode(false);
    alert('CRED profile updated successfully!');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Profile Settings</h2>
        <button 
          onClick={() => editMode ? handleSave() : setEditMode(true)}
          className="bg-blue-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 text-sm sm:text-base"
        >
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              disabled={!editMode}
              className={`w-full p-3 border rounded-lg ${editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!editMode}
              className={`w-full p-3 border rounded-lg ${editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!editMode}
              className={`w-full p-3 border rounded-lg ${editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Account Security</h3>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-semibold text-gray-900">Notifications</div>
                <div className="text-gray-600 text-sm">Receive updates about your cases</div>
              </div>
              <button
                onClick={() => setProfileData({...profileData, notifications: !profileData.notifications})}
                disabled={!editMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profileData.notifications ? 'bg-blue-600' : 'bg-gray-300'
                } ${!editMode && 'opacity-50 cursor-not-allowed'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profileData.notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                <div className="text-gray-600 text-sm">Enhanced security for your account</div>
              </div>
              <button
                onClick={() => setProfileData({...profileData, twoFactor: !profileData.twoFactor})}
                disabled={!editMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profileData.twoFactor ? 'bg-blue-600' : 'bg-gray-300'
                } ${!editMode && 'opacity-50 cursor-not-allowed'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profileData.twoFactor ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">Account Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">CRED Member Since:</span>
                <span className="font-semibold">{new Date(user.created_at || '2025-01-01').toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Account Status:</span>
                <span className="font-semibold text-blue-600">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Investments:</span>
                <span className="font-semibold">{user.active_investments || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Success Rate:</span>
                <span className="font-semibold text-green-600">99.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};