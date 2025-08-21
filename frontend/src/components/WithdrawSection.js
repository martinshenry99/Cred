import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const WithdrawSection = ({ user, investments }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate available balance from approved investments only
  const approvedInvestments = investments.filter(inv => inv.status === 'active');
  const availableBalance = approvedInvestments.reduce((sum, inv) => sum + (inv.returns || 0), 0);

  const cryptoOptions = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      color: 'from-orange-500 to-yellow-500',
      network: 'Bitcoin Network'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      color: 'from-blue-500 to-purple-500',
      network: 'Ethereum Network'
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      color: 'from-green-500 to-emerald-500',
      network: 'Ethereum Network (ERC-20)'
    }
  ];

  const selectedCryptoData = cryptoOptions.find(c => c.id === selectedCrypto);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    
    if (!withdrawAmount || !walletAddress) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(withdrawAmount) > availableBalance) {
      alert('Insufficient balance. Available: $' + availableBalance.toLocaleString());
      return;
    }

    if (parseFloat(withdrawAmount) < 50) {
      alert('Minimum withdrawal amount is $50');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/investment/withdraw`, {
        amount: parseFloat(withdrawAmount),
        crypto_type: selectedCrypto,
        wallet_address: walletAddress
      });

      alert('Withdrawal request submitted successfully! Processing time: 1-3 business days.');
      setWithdrawAmount('');
      setWalletAddress('');
    } catch (error) {
      alert('Failed to submit withdrawal request: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">💸 Crypto Withdrawal</h2>
        <p className="text-purple-100">Withdraw your approved investment returns</p>
      </div>

      {/* Available Balance */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Balance</h3>
          <div className="text-3xl font-bold text-green-600">${availableBalance.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mt-1">From admin-approved investments only</p>
        </div>
      </div>

      {availableBalance === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Available Balance</h3>
          <p className="text-yellow-700">You don't have any approved investments with available returns to withdraw.</p>
          <p className="text-sm text-yellow-600 mt-2">
            Investments must be verified and activated by admin before withdrawal is possible.
          </p>
        </div>
      ) : (
        <>
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
                      ? 'border-purple-500 bg-purple-50'
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

          {/* Withdrawal Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Details</h3>
            
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount in USD"
                    min="50"
                    max={availableBalance}
                    step="0.01"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Min: $50 | Max: ${availableBalance.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Network Information
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Cryptocurrency:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedCryptoData.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Network:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedCryptoData.network}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedCryptoData.name} Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder={`Enter your ${selectedCryptoData.symbol} wallet address`}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Make sure this address supports {selectedCryptoData.name} on {selectedCryptoData.network}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing Withdrawal...' : 'Submit Withdrawal Request'}
              </button>
            </form>
          </div>

          {/* Important Notes */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Important Withdrawal Information</h3>
            <div className="space-y-2 text-sm text-red-700">
              <div className="flex items-start">
                <span className="mr-2">•</span>
                <span>Minimum withdrawal amount is $50 USD</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">•</span>
                <span>Processing time: 1-3 business days after admin approval</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">•</span>
                <span>Double-check wallet address - transactions cannot be reversed</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">•</span>
                <span>Network fees will be deducted from your withdrawal amount</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">•</span>
                <span>Only approved investment returns are eligible for withdrawal</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};