import React, { useState } from 'react';
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

// Updated Services Section with Romance Scam and Phishing Recovery in smaller layout
export const ServicesSection = ({ detailed = false, user, onNavigateToDashboard, onShowLogin }) => {
  
  const handleCTAClick = () => {
    if (user) {
      onNavigateToDashboard();
    } else {
      onShowLogin();
    }
  };

  const primaryServices = [
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

  const specializedServices = [
    {
      icon: '💔',
      title: 'Romance Scam Recovery',
      description: 'Specialized recovery for romance scam victims. Expert tracking and recovery of cryptocurrency sent to romance scammers.',
      image: 'https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZm9yZW5zaWNzfGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '🎣',
      title: 'Phishing Recovery',
      description: 'Emergency response for phishing attack victims. Immediate wallet security and asset tracking across blockchains.',
      image: 'https://images.unsplash.com/photo-1596267356606-b0e18c11c6d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxkaWdpdGFsJTIwZm9yZW5zaWNzfGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85'
    }
  ];

  return (
    <div className={`${detailed ? '' : 'py-12 sm:py-20'} bg-gray-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!detailed && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">CRED Core Services</h2>
            <p className="text-lg sm:text-xl text-gray-600">Professional cryptocurrency enforcement and investigation services</p>
          </div>
        )}
        
        {/* Primary Services - Larger Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
          {primaryServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="h-48 sm:h-64 bg-cover bg-center" style={{backgroundImage: `url(${service.image})`}}></div>
              <div className="p-6 sm:p-8">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{service.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                
                <button 
                  onClick={handleCTAClick}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 ${
                    index === 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {user ? 'Go to Dashboard' : 'Start Investigation'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Services - Smaller Layout */}
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Specialized Recovery Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specializedServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="h-32 sm:h-40 bg-cover bg-center" style={{backgroundImage: `url(${service.image})`}}></div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl sm:text-3xl mr-3">{service.icon}</div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900">{service.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  
                  <button className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition duration-300 ${
                    index === 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}>
                    Get Help Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
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

// Testimonials Section
export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Elena Rossi",
      role: "Romance Scam Victim",
      image: "https://images.unsplash.com/photo-1494790108755-2616b2e9ce33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzfGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85",
      content: "CRED helped me recover €45,000 that I lost to a romance scammer. Their team was professional, compassionate, and incredibly effective. I never thought I'd see my money again.",
      rating: 5,
      amount: "€45,000",
      case: "Romance Scam"
    },
    {
      name: "Henrik Andersson",
      role: "Phishing Attack Victim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85",
      content: "When I fell for a phishing attack and lost my crypto wallet, CRED's emergency response team froze the stolen funds within hours. They recovered 98% of my Bitcoin.",
      rating: 5,
      amount: "€120,000",
      case: "Phishing Attack"
    },
    {
      name: "Marie Dubois",
      role: "Investment Fraud Victim",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzfGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85",
      content: "The CRED investigation team tracked down the criminals who stole my crypto investments. Their forensic analysis was thorough and led to a successful recovery.",
      rating: 5,
      amount: "€75,000",
      case: "Investment Fraud"
    },
    {
      name: "Klaus Mueller",
      role: "Exchange Hack Victim",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHxibHVlfDE3NTM1NjY2OTl8MA&ixlib=rb-4.1.0&q=85",
      content: "After a crypto exchange hack, CRED worked with international law enforcement to trace my stolen funds across multiple blockchains. Outstanding service!",
      rating: 5,
      amount: "€200,000",
      case: "Exchange Hack"
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Success Stories</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Real testimonials from victims who successfully recovered their stolen crypto assets with CRED
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 sm:p-8 hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              
              <div className="flex justify-between items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Recovered: {testimonial.amount}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {testimonial.case}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">Join Our Success Stories</h3>
            <p className="text-blue-700 mb-6">
              Over 3,000 victims have successfully recovered their stolen cryptocurrency with CRED's help
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Start Your Recovery Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Section
export const FAQSection = () => {
  const faqs = [
    {
      question: "How quickly can CRED respond to crypto theft?",
      answer: "CRED's emergency response team can begin investigating within 2 hours of your report. For urgent cases like active phishing attacks, our team can start freezing stolen assets within the first hour."
    },
    {
      question: "What types of cryptocurrency crimes does CRED handle?",
      answer: "CRED investigates all types of crypto crimes including romance scams, phishing attacks, investment fraud, exchange hacks, ransomware payments, and other digital asset thefts."
    },
    {
      question: "What is CRED's success rate for crypto recovery?",
      answer: "CRED has a 94% success rate in cryptocurrency recovery cases. We've recovered over $200 million in stolen digital assets for victims worldwide."
    },
    {
      question: "How does the crypto recovery process work?",
      answer: "Our process involves immediate threat assessment, blockchain forensic analysis, asset tracking across multiple networks, coordination with exchanges and law enforcement, and legal recovery procedures."
    },
    {
      question: "Is there a fee for CRED's services?",
      answer: "Initial consultations are free. Our fees are contingency-based, meaning you only pay when we successfully recover your assets. We're transparent about all costs upfront."
    },
    {
      question: "Can CRED help with international crypto theft cases?",
      answer: "Yes, CRED works with international law enforcement agencies, exchanges, and legal authorities worldwide to recover stolen cryptocurrency regardless of geographic boundaries."
    },
    {
      question: "What information do I need to provide to start a case?",
      answer: "We need transaction details, wallet addresses, communication records with scammers, and any evidence of the theft. Our team will guide you through the documentation process."
    },
    {
      question: "How long does the recovery process take?",
      answer: "Recovery timelines vary depending on case complexity. Simple cases may be resolved in weeks, while complex international cases can take several months. We provide regular updates throughout the process."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Frequently Asked Questions</h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Common questions about CRED's cryptocurrency recovery services
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <span className={`text-2xl text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="mb-6">
              Our expert team is available 24/7 to answer your questions and provide immediate assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                Live Chat Support
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                Emergency Hotline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};