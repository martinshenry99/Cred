import React from 'react';
import { Link } from 'react-router-dom';

// Footer Component (Mobile-friendly)
export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-lg sm:text-xl font-bold">🛡️</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold">CRED</span>
                <div className="text-xs text-gray-400">Crypto Regulatory Enforcement</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Protecting justice and regulatory compliance in the cryptocurrency ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📧</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📱</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">🔗</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">CRED Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition duration-300">Crypto Investigation</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Compliance Monitoring</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Asset Recovery</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Enforcement Reports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Agency</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition duration-300">About CRED</Link></li>
              <li><Link to="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Contact CRED</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>🏛️ 100 Crypto Enforcement Plaza</li>
              <li>Washington, DC 20515</li>
              <li>📞 +1 (800) CRYPTO-1</li>
              <li>✉️ enforcement@cred.gov</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CRED - Crypto Regulatory Enforcement Division. All rights reserved. | Securing the crypto ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
};