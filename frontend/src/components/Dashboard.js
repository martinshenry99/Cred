import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LiveChat } from './Chat';
import { OverviewSection } from './OverviewSection';
import { DepositSection } from './DepositSection';
import { WithdrawSection } from './WithdrawSection';
import { ReportSubmissionForm } from './ReportSubmissionForm';
import { ProfileSection } from './ProfileSection';

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
      {/* Modern Header with proper spacing */}
      <div className="bg-white shadow-lg border-b border-gray-200 pt-20">
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
                { id: 'withdraw', label: 'Withdraw', icon: '💸' },
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
            {activeTab === 'withdraw' && <WithdrawSection user={user} investments={investments} />}
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