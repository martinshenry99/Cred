import React from 'react';

export const OverviewSection = ({ user, userReports, investments, cryptoPrices }) => {
  const totalInvestment = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalReturns = investments.reduce((sum, inv) => sum + (inv.returns || 0), 0);
  const activeReports = userReports.filter(r => r.status !== 'completed').length;
  
  // Calculate available balance from approved investments only
  const approvedInvestments = investments.filter(inv => inv.status === 'active');
  const availableBalance = approvedInvestments.reduce((sum, inv) => sum + (inv.returns || 0), 0);

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
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">${availableBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">💳</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-600">Admin approved funds</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Returns</p>
              <p className="text-2xl font-bold text-gray-900">${totalReturns.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📈</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-purple-600">+8.2% yield</div>
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
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    investment.status === 'active' ? 'bg-green-100 text-green-800' :
                    investment.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {investment.status.replace('_', ' ').toUpperCase()}
                  </div>
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