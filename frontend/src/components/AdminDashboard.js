import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Admin Dashboard
export const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [dashboardRes, reportsRes, usersRes, investmentsRes] = await Promise.all([
        axios.get(`${API}/admin/dashboard`),
        axios.get(`${API}/admin/reports`),
        axios.get(`${API}/admin/users`),
        axios.get(`${API}/admin/investments`)
      ]);
      
      setDashboardData(dashboardRes.data);
      setReports(reportsRes.data.reports);
      setUsers(usersRes.data.users);
      setInvestments(investmentsRes.data.investments);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyInvestment = async (investmentId) => {
    try {
      await axios.post(`${API}/admin/investments/verify/${investmentId}`);
      alert('Investment verified successfully!');
      fetchAdminData();
    } catch (error) {
      alert('Failed to verify investment: ' + (error.response?.data?.detail || error.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <p className="text-xl">Loading CRED Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-lg flex items-center justify-center mr-4 sm:mr-6">
              <span className="text-white text-xl sm:text-2xl font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CRED Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Administrator: {user.name}</p>
            </div>
          </div>
        </div>

        {/* Admin Stats */}
        {dashboardData && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-blue-900">{dashboardData.users.total}</div>
              <div className="text-xs sm:text-sm text-blue-700">Total Users</div>
              <div className="text-xs text-gray-500 mt-1">{dashboardData.users.verified} verified</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-green-900">{dashboardData.reports.total}</div>
              <div className="text-xs sm:text-sm text-green-700">Reports</div>
              <div className="text-xs text-gray-500 mt-1">{dashboardData.reports.pending} pending</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-purple-900">{dashboardData.investments.total}</div>
              <div className="text-xs sm:text-sm text-purple-700">Investments</div>
              <div className="text-xs text-gray-500 mt-1">${dashboardData.investments.total_amount.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-orange-900">{dashboardData.withdrawals.total}</div>
              <div className="text-xs sm:text-sm text-orange-700">Withdrawals</div>
              <div className="text-xs text-gray-500 mt-1">{dashboardData.withdrawals.pending} pending</div>
            </div>
          </div>
        )}

        {/* Admin Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6 sm:mb-8">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'reports', label: 'Reports' },
              { id: 'investments', label: 'Investments' },
              { id: 'users', label: 'Users' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-red-600 text-red-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-4 sm:p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>New user registrations (24h)</span>
                        <span className="font-semibold">+{dashboardData?.users.unverified || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending reports</span>
                        <span className="font-semibold text-yellow-600">{dashboardData?.reports.pending || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending investments</span>
                        <span className="font-semibold text-blue-600">{dashboardData?.investments.pending || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Email Service</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Database</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Crypto Prices API</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Investigation Reports</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">User</th>
                        <th className="text-left py-2">Category</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map(report => (
                        <tr key={report._id} className="border-b">
                          <td className="py-3">{report.title}</td>
                          <td className="py-3">{report.user_name}</td>
                          <td className="py-3">{report.category}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === 'completed' ? 'bg-green-100 text-green-800' :
                              report.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3">{new Date(report.created_at).toLocaleDateString()}</td>
                          <td className="py-3">
                            <button className="text-blue-600 hover:text-blue-800 text-xs">
                              View/Reply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'investments' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Investment Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">User</th>
                        <th className="text-left py-2">Package</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Crypto</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map(investment => (
                        <tr key={investment._id} className="border-b">
                          <td className="py-3">{investment.user_id}</td>
                          <td className="py-3">{investment.package_name}</td>
                          <td className="py-3">${investment.amount.toLocaleString()}</td>
                          <td className="py-3">{investment.crypto_type.toUpperCase()}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              investment.status === 'active' ? 'bg-green-100 text-green-800' :
                              investment.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {investment.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3">
                            {investment.status === 'pending_verification' && (
                              <button 
                                onClick={() => verifyInvestment(investment._id)}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Total Investment</th>
                        <th className="text-left py-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id} className="border-b">
                          <td className="py-3">{user.name}</td>
                          <td className="py-3">{user.email}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.is_verified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3">${user.total_investment?.toLocaleString() || '0'}</td>
                          <td className="py-3">{new Date(user.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};