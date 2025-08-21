import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const DepositSection = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [depositAmount, setDepositAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const cryptoOptions = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      address: 'bc1qsa0lahrqs8pc3ug4d5qx5huuxdmxuxksk9ec6x',
      color: 'from-orange-500 to-yellow-500',
      network: 'Bitcoin Network'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      address: '0xDBF8A0aa8a17C90C25228537F393501228742510',
      color: 'from-blue-500 to-purple-500',
      network: 'Ethereum Network'
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      address: '0xDBF8A0aa8a17C90C25228537F393501228742510',
      color: 'from-green-500 to-emerald-500',
      network: 'Ethereum Network (ERC-20)'
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