import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Admin Dashboard - Simple and Comprehensive
export const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
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
      setDeposits(investmentsRes.data.investments.filter(i => i.type === 'deposit'));
      setWithdrawals(investmentsRes.data.investments.filter(i => i.type === 'withdrawal'));
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyInvestment = async (investmentId) => {
    try {
      await axios.post(`${API}/admin/investments/verify/${investmentId}`);
      alert('Investment verified successfully!');
      fetchAdminData();
    } catch (error) {
      alert('Failed to verify investment: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleApproveWithdrawal = async (withdrawalId) => {
    try {
      await axios.post(`${API}/admin/withdrawals/approve/${withdrawalId}`);
      alert('Withdrawal approved successfully!');
      fetchAdminData();
    } catch (error) {
      alert('Failed to approve withdrawal: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleConfirmDeposit = async (depositId) => {
    try {
      await axios.post(`${API}/admin/deposits/confirm/${depositId}`);
      alert('Deposit confirmed successfully!');
      fetchAdminData();
    } catch (error) {
      alert('Failed to confirm deposit: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleUpdateUserStatus = async (userId, isActive) => {
    try {
      await axios.put(`${API}/admin/users/${userId}/status`, { is_active: isActive });
      alert(`User ${isActive ? 'activated' : 'deactivated'} successfully!`);
      fetchAdminData();
    } catch (error) {
      alert('Failed to update user status: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleUpdateReportProgress = async (reportId, status) => {
    try {
      await axios.put(`${API}/admin/reports/${reportId}/progress`, { status });
      alert('Report progress updated successfully!');
      fetchAdminData();
    } catch (error) {
      alert('Failed to update report progress: ' + (error.response?.data?.detail || error.message));
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
        {/* Simple Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CRED Admin Portal</h1>
                <p className="text-gray-600">Administrator: {user.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
              <div className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {dashboardData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-blue-600">{dashboardData.users.total}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-green-600">{dashboardData.investments.pending}</div>
              <div className="text-sm text-gray-600">Pending Investments</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-orange-600">{dashboardData.reports.pending}</div>
              <div className="text-sm text-gray-600">Pending Reports</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-purple-600">{dashboardData.withdrawals.pending}</div>
              <div className="text-sm text-gray-600">Pending Withdrawals</div>
            </div>
          </div>
        )}

        {/* Simple Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'investments', label: 'Investments', icon: '💰' },
                { id: 'reports', label: 'Reports', icon: '📋' },
                { id: 'deposits', label: 'Deposits', icon: '💳' },
                { id: 'withdrawals', label: 'Withdrawals', icon: '💸' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab dashboardData={dashboardData} />}
            {activeTab === 'users' && <UsersTab users={users} onUpdateStatus={handleUpdateUserStatus} />}
            {activeTab === 'investments' && <InvestmentsTab investments={investments} onVerify={handleVerifyInvestment} />}
            {activeTab === 'reports' && <ReportsTab reports={reports} onUpdateProgress={handleUpdateReportProgress} />}
            {activeTab === 'deposits' && <DepositsTab deposits={deposits} onConfirm={handleConfirmDeposit} />}
            {activeTab === 'withdrawals' && <WithdrawalsTab withdrawals={withdrawals} onApprove={handleApproveWithdrawal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ dashboardData }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">System Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>New registrations (24h)</span>
            <span className="font-semibold text-blue-600">+{dashboardData?.users.new_today || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending verifications</span>
            <span className="font-semibold text-orange-600">{dashboardData?.users.unverified || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Active investments</span>
            <span className="font-semibold text-green-600">{dashboardData?.investments.active || 0}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">System Health</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>Database</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Email Service</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span>API Status</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Users Management Tab
const UsersTab = ({ users, onUpdateStatus }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">User Management</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 border">Name</th>
            <th className="text-left p-3 border">Email</th>
            <th className="text-left p-3 border">Status</th>
            <th className="text-left p-3 border">Joined</th>
            <th className="text-left p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.is_verified ? 'Verified' : 'Pending'}
                </span>
              </td>
              <td className="p-3 border">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="p-3 border">
                <button
                  onClick={() => onUpdateStatus(user._id, !user.is_active)}
                  className={`px-3 py-1 rounded text-xs ${
                    user.is_active ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {user.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Investments Tab
const InvestmentsTab = ({ investments, onVerify }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Investment Verification</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 border">User</th>
            <th className="text-left p-3 border">Amount</th>
            <th className="text-left p-3 border">Crypto</th>
            <th className="text-left p-3 border">Status</th>
            <th className="text-left p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map(investment => (
            <tr key={investment._id} className="hover:bg-gray-50">
              <td className="p-3 border">{investment.user_name}</td>
              <td className="p-3 border">${investment.amount?.toLocaleString()}</td>
              <td className="p-3 border">{investment.crypto_type?.toUpperCase()}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  investment.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {investment.status?.replace('_', ' ').toUpperCase()}
                </span>
              </td>
              <td className="p-3 border">
                {investment.status === 'pending_verification' && (
                  <button
                    onClick={() => onVerify(investment._id)}
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
);

// Reports Tab
const ReportsTab = ({ reports, onUpdateProgress }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Investigation Reports</h2>
    <div className="space-y-4">
      {reports.map(report => (
        <div key={report._id} className="bg-white border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{report.title}</h3>
            <select
              value={report.status}
              onChange={(e) => onUpdateProgress(report._id, e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>User: {report.user_name}</span>
            <span>Category: {report.category}</span>
            <span>Date: {new Date(report.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Deposits Tab
const DepositsTab = ({ deposits, onConfirm }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Confirm Deposits</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 border">User</th>
            <th className="text-left p-3 border">Amount</th>
            <th className="text-left p-3 border">Crypto</th>
            <th className="text-left p-3 border">TX Hash</th>
            <th className="text-left p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map(deposit => (
            <tr key={deposit._id} className="hover:bg-gray-50">
              <td className="p-3 border">{deposit.user_name}</td>
              <td className="p-3 border">${deposit.amount?.toLocaleString()}</td>
              <td className="p-3 border">{deposit.crypto_type?.toUpperCase()}</td>
              <td className="p-3 border">
                <span className="font-mono text-xs">{deposit.transaction_hash?.substring(0, 20)}...</span>
              </td>
              <td className="p-3 border">
                <button
                  onClick={() => onConfirm(deposit._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Withdrawals Tab
const WithdrawalsTab = ({ withdrawals, onApprove }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Approve Withdrawals</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 border">User</th>
            <th className="text-left p-3 border">Amount</th>
            <th className="text-left p-3 border">Crypto</th>
            <th className="text-left p-3 border">Address</th>
            <th className="text-left p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map(withdrawal => (
            <tr key={withdrawal._id} className="hover:bg-gray-50">
              <td className="p-3 border">{withdrawal.user_name}</td>
              <td className="p-3 border">${withdrawal.amount?.toLocaleString()}</td>
              <td className="p-3 border">{withdrawal.crypto_type?.toUpperCase()}</td>
              <td className="p-3 border">
                <span className="font-mono text-xs">{withdrawal.wallet_address?.substring(0, 20)}...</span>
              </td>
              <td className="p-3 border">
                <button
                  onClick={() => onApprove(withdrawal._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);