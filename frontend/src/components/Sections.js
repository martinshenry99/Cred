import React from 'react';
import { Link } from 'react-router-dom';

export const CryptoPricesSection = ({ prices }) => {
  return (
    <div className="py-8 sm:py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Live Crypto Prices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl mb-2">₿</div>
            <div className="text-lg sm:text-xl font-bold text-orange-400">Bitcoin</div>
            <div className="text-xl sm:text-2xl font-bold">${prices.btc?.toLocaleString() || '50,000'}</div>
            <div className="text-xs sm:text-sm text-gray-400">BTC/USD</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl mb-2">Ξ</div>
            <div className="text-lg sm:text-xl font-bold text-blue-400">Ethereum</div>
            <div className="text-xl sm:text-2xl font-bold">${prices.eth?.toLocaleString() || '3,000'}</div>
            <div className="text-xs sm:text-sm text-gray-400">ETH/USD</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl mb-2">₮</div>
            <div className="text-lg sm:text-xl font-bold text-green-400">Tether</div>
            <div className="text-xl sm:text-2xl font-bold">${prices.usdt?.toFixed(2) || '1.00'}</div>
            <div className="text-xs sm:text-sm text-gray-400">USDT/USD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated Services Section with Romance Scam and Phishing Recovery
export const ServicesSection = ({ detailed = false }) => {
  const services = [
    {
      icon: '💔',
      title: 'Romance Scam Recovery',
      description: detailed 
        ? 'Specialized recovery for romance scam victims. Our team tracks cryptocurrency payments made to romance scammers using advanced blockchain analysis and works with international law enforcement to freeze and recover stolen funds.' 
        : 'Victim of a romance scam? Our experts specialize in tracking and recovering cryptocurrency sent to romance scammers. We\'ve helped over 1,200 victims recover their stolen funds.',
      image: 'https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZm9yZW5zaWNzfGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '🎣',
      title: 'Phishing Recovery',
      description: detailed
        ? 'Emergency response for phishing attack victims. We provide immediate wallet security, track stolen assets across multiple blockchains, and coordinate with exchanges to freeze criminal accounts before funds are moved.'
        : 'Fell for a phishing attack? Act fast! Our emergency response team can freeze stolen crypto within hours and trace funds through complex blockchain networks to recover your assets.',
      image: 'https://images.unsplash.com/photo-1596267356606-b0e18c11c6d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxkaWdpdGFsJTIwZm9yZW5zaWNzfGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '🔍',
      title: 'Crypto Investigation',
      description: detailed
        ? 'Advanced blockchain forensics and cryptocurrency investigation services. We analyze transaction patterns, identify criminal networks, and provide detailed forensic reports for legal proceedings and law enforcement cooperation.'
        : 'Comprehensive blockchain analysis and crypto forensics. Our investigators use advanced tools to trace transactions, identify bad actors, and build cases for successful asset recovery.',
      image: 'https://images.unsplash.com/photo-1597781914467-a5b93258e748?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjcnlwdG8lMjBpbnZlc3RpZ2F0aW9ufGVufDB8fHxibHVlfDE3NTM1NjY2OTN8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '💰',
      title: 'Asset Recovery',
      description: detailed
        ? 'Professional cryptocurrency asset recovery using legal enforcement channels. We work with international law enforcement, exchanges, and legal authorities to recover and return stolen digital assets to rightful owners.'
        : 'Federal-powered cryptocurrency asset recovery. CRED works with exchanges and law enforcement agencies worldwide to freeze criminal accounts and return stolen crypto to victims.',
      image: 'https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg'
    }
  ];

  return (
    <div className={`${detailed ? '' : 'py-12 sm:py-20'} bg-gray-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!detailed && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">CRED Specialized Services</h2>
            <p className="text-lg sm:text-xl text-gray-600">Expert recovery for romance scams, phishing attacks, and crypto fraud</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="h-32 sm:h-48 bg-cover bg-center" style={{backgroundImage: `url(${service.image})`}}></div>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                
                {/* Action Button for each service */}
                <div className="mt-4">
                  <button className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition duration-300 ${
                    index === 0 ? 'bg-red-600 text-white hover:bg-red-700' :
                    index === 1 ? 'bg-orange-600 text-white hover:bg-orange-700' :
                    index === 2 ? 'bg-blue-600 text-white hover:bg-blue-700' :
                    'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                    Get Help Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">CRED Recovery Success Rate</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-red-600">1,200+</div>
              <div className="text-xs sm:text-sm text-red-700">Romance Scam Cases</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">850+</div>
              <div className="text-xs sm:text-sm text-orange-700">Phishing Recoveries</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">$200M+</div>
              <div className="text-xs sm:text-sm text-blue-700">Total Recovered</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">94%</div>
              <div className="text-xs sm:text-sm text-green-700">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Section (Mobile-friendly)
export const AboutSection = () => {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Securing the Crypto Future</h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">
              With over a decade of experience in cryptocurrency enforcement and regulatory compliance, CRED 
              stands at the forefront of digital asset crime prevention and recovery.
            </p>
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg">
              Our team combines traditional law enforcement expertise with cutting-edge blockchain technology to deliver results 
              that matter. We've successfully recovered over $120 million in cryptocurrency assets.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-900">750+</div>
                <div className="text-sm sm:text-base text-gray-600">Cases</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-900">$120M+</div>
                <div className="text-sm sm:text-base text-gray-600">Recovered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-900">99%</div>
                <div className="text-sm sm:text-base text-gray-600">Success</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1601198073086-2ce12015e06b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxqdXN0aWNlJTIwYXV0aG9yaXR5fGVufDB8fHxibHVlfDE3NTMwOTQ1NjV8MA&ixlib=rb-4.1.0&q=85"
              alt="Justice and Authority"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Section
export const ContactSection = () => {
  return (
    <div className="py-12 sm:py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Ready to Report Crypto Crime?</h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
          Don't let cryptocurrency criminals get away with your digital assets. Contact CRED today 
          and take the first step towards recovery and enforcement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <Link 
            to="/contact"
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 inline-block"
          >
            Contact CRED Now
          </Link>
          <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-slate-800 transition duration-300 transform hover:scale-105">
            Emergency Hotline
          </button>
        </div>
      </div>
    </div>
  );
};