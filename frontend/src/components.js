import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Main Pages Components
export const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <LiveChat />
    </div>
  );
};

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Crypto Regulatory Enforcement Division</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established to uphold the highest standards of regulatory compliance, security, and legal excellence in the cryptocurrency ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560250163-17506787d971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fGJsdWV8MTc1MzAzOTE1NHww&ixlib=rb-4.1.0&q=85"
              alt="Professional Team Meeting"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At CRED (Crypto Regulatory Enforcement Division), we specialize in providing cutting-edge solutions to detect, prevent, and investigate cryptocurrency crimes and fraudulent activities. Our expert team of analysts, investigators, and legal specialists work tirelessly to protect your digital assets and ensure regulatory compliance.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're facing issues with suspicious crypto transactions, regulatory compliance, money laundering investigations, or asset recovery, we leverage advanced tools and proven strategies to bring transparency, accountability, and justice to the cryptocurrency ecosystem.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">750+</div>
                <div className="text-blue-700">Crypto Cases</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">$120M+</div>
                <div className="text-blue-700">Crypto Recovered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
  );
};

export const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">CRED Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive crypto regulatory enforcement, investigation, and compliance solutions.
          </p>
        </div>
        
        <ServicesSection detailed={true} />
      </div>
      <LiveChat />
    </div>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message. Our CRED team will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact CRED</h1>
          <p className="text-xl text-gray-600">Get in touch with our crypto enforcement experts</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">CRED Headquarters</div>
                  <div className="text-gray-600">100 Crypto Enforcement Plaza, Washington, DC 20515</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Emergency Hotline</div>
                  <div className="text-gray-600">+1 (800) CRYPTO-1</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">✉️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">enforcement@cred.gov</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
  );
};

// Navigation Component
export const Navigation = ({ isLoggedIn, user, onLogin, onLogout }) => {
  const location = useLocation();
  
  return (
    <nav className="bg-slate-800 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">🛡️</span>
              </div>
              <div>
                <span className="text-xl font-bold">CRED</span>
                <div className="text-xs text-gray-300">Crypto Regulatory Enforcement Division</div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/' ? 'text-blue-400' : ''}`}
            >
              HOME
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/about' ? 'text-blue-400' : ''}`}
            >
              ABOUT CRED
            </Link>
            <Link 
              to="/services" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/services' ? 'text-blue-400' : ''}`}
            >
              SERVICES
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-blue-400 transition duration-300 ${location.pathname === '/contact' ? 'text-blue-400' : ''}`}
            >
              CONTACT
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={onLogin}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Sign In
                </button>
                <button 
                  onClick={onLogin}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1546104294-d656c99943fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwYXV0aG9yaXR5fGVufDB8fHxibHVlfDE3NTMwOTQ1NjV8MA&ixlib=rb-4.1.0&q=85')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Welcome to <span className="text-blue-400">CRED</span><br />
          <span className="text-3xl md:text-4xl">Crypto Regulatory Enforcement Division</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
          At CRED, we specialize in providing cutting-edge solutions to detect, prevent, and investigate 
          cryptocurrency crimes within the digital space. Our expert team of regulatory analysts, investigators, 
          and legal specialists work tirelessly to protect your crypto assets and ensure compliance with 
          federal regulations. Whether you're facing issues with fraudulent crypto transactions, regulatory 
          violations, money laundering investigations, or digital asset recovery, we leverage advanced blockchain 
          analysis tools and proven enforcement strategies to bring transparency, accountability, and justice to 
          the cryptocurrency ecosystem. With a focus on regulatory compliance and cutting-edge investigation 
          techniques, we help our clients navigate the complex world of crypto regulations with confidence. 
          Let CRED be your first line of defense against cryptocurrency crime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Report Crypto Crime
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-800 transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

// Services Section
export const ServicesSection = ({ detailed = false }) => {
  const services = [
    {
      icon: '🔍',
      title: 'Crypto Investigation',
      description: detailed 
        ? 'Advanced blockchain analysis and cryptocurrency forensics to trace illegal transactions, identify bad actors, and recover stolen digital assets through regulatory enforcement channels.' 
        : 'Cryptocurrency crimes are everywhere. It\'s important to be careful in the crypto space, but if you\'ve lost your coins to crypto fraud, CRED can help you on the road to digital asset recovery.',
      image: 'https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '🛡️',
      title: 'Crypto Compliance',
      description: detailed
        ? 'Real-time monitoring and compliance solutions for cryptocurrency exchanges, DeFi protocols, and blockchain businesses to ensure regulatory adherence and prevent violations.'
        : 'Is your crypto exchange compliant? Is that DeFi protocol legitimate? The cryptocurrency landscape can seem like the wild west and you may find yourself asking, "Is this platform regulated?"',
      image: 'https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '💰',
      title: 'Asset Recovery',
      description: detailed
        ? 'Specialized recovery services for stolen or misappropriated cryptocurrency assets, utilizing legal enforcement channels and advanced blockchain tracing to recover your digital funds.'
        : 'Have you lost your crypto to a fake exchange? Did a DeFi protocol rug pull and steal your tokens? Fight back with CRED\'s crypto recovery methods that will get your digital assets back.',
      image: 'https://images.unsplash.com/photo-1619806677949-cbae91e82cea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjb3VydGhvdXNlfGVufDB8fHxibHVlfDE3NTMwOTQ1ODd8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '📋',
      title: 'Enforcement Report',
      description: detailed
        ? 'Detailed regulatory enforcement reports that provide comprehensive analysis of cryptocurrency violations, suitable for legal proceedings and regulatory compliance submissions.'
        : 'We will summarize our extensive crypto investigation results in an enforcement report that will give you a head start with regulatory authorities. Our enforcement reports are crucial to getting federal attention.',
      image: 'https://images.unsplash.com/photo-1720480916424-ff20c676d61d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjb3VydGhvdXNlfGVufDB8fHxibHVlfDE3NTMwOTQ1ODd8MA&ixlib=rb-4.1.0&q=85'
    }
  ];

  return (
    <div className={`${detailed ? '' : 'py-20'} bg-gray-50`}>
      <div className="max-w-7xl mx-auto px-4">
        {!detailed && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">CRED Services</h2>
            <p className="text-xl text-gray-600">Comprehensive crypto enforcement and regulatory compliance solutions</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${service.image})`}}></div>
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// About Section
export const AboutSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Protecting Justice in the Crypto Age</h2>
            <p className="text-gray-700 mb-6 text-lg">
              With over a decade of experience in cryptocurrency enforcement and regulatory compliance, CRED 
              stands at the forefront of digital asset crime prevention and recovery.
            </p>
            <p className="text-gray-700 mb-8 text-lg">
              Our team combines traditional law enforcement expertise with cutting-edge blockchain technology to deliver results 
              that matter. We've successfully recovered over $120 million in cryptocurrency assets and brought justice to countless victims 
              of crypto crimes.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-900">750+</div>
                <div className="text-gray-600">Crypto Cases</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">$120M+</div>
                <div className="text-gray-600">Recovered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">99%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          <div>
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
    <div className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Report Crypto Crime?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Don't let cryptocurrency criminals get away with your hard-earned digital assets. Contact CRED today 
          and take the first step towards recovery and regulatory enforcement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Contact CRED Now
          </Link>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-800 transition duration-300 transform hover:scale-105">
            Emergency Crypto Hotline
          </button>
        </div>
      </div>
    </div>
  );
};

// Login Modal
export const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock user data - in real app this would call an API
    const userData = {
      id: 1,
      name: formData.name || 'Agent Smith',
      email: formData.email,
      role: 'CRED Premium Member',
      joinDate: '2025-01-01',
      totalInvestment: 150000,
      activeInvestments: 4,
      returns: 18500
    };
    
    onLogin(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">🛡️</span>
          </div>
          <h2 className="text-2xl font-bold">
            {isLoginMode ? 'CRED Sign In' : 'CRED Sign Up'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          {!isLoginMode && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 mb-4"
          >
            {isLoginMode ? 'Sign In to CRED' : 'Join CRED'}
          </button>
        </form>
        
        <div className="text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            {isLoginMode ? "Don't have an account? Join CRED" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
export const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-6">
                <span className="text-white text-2xl font-bold">🛡️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mt-1">{user.role} • Member since {user.joinDate}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${user.totalInvestment.toLocaleString()}</div>
              <div className="text-gray-600">Total Investment Portfolio</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'investments', label: 'Premium Investments' },
              { id: 'reports', label: 'Enforcement Reports' },
              { id: 'profile', label: 'Profile' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            {activeTab === 'overview' && <DashboardOverview user={user} />}
            {activeTab === 'investments' && <InvestmentDashboard user={user} />}
            {activeTab === 'reports' && <ReportsSection user={user} />}
            {activeTab === 'profile' && <ProfileSection user={user} />}
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
  );
};

// Dashboard Overview
const DashboardOverview = ({ user }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">CRED Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-blue-900">{user.activeInvestments}</div>
          <div className="text-blue-700">Active Investments</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-green-900">${user.returns.toLocaleString()}</div>
          <div className="text-green-700">Total Returns (3mo)</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-purple-900">+15.8%</div>
          <div className="text-purple-700">Average APY</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-orange-900">24/7</div>
          <div className="text-orange-700">Lawyer Access</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Premium Investment: Elite Enforcement Fund', amount: '+$50,000', date: '2025-01-20' },
              { action: 'Quarterly Return: Crypto Recovery Fund', amount: '+$8,500', date: '2025-01-18' },
              { action: 'Lawyer Consultation: Asset Recovery Case', amount: 'Completed', date: '2025-01-15' },
              { action: 'Enforcement Report Generated', amount: 'Complete', date: '2025-01-12' }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{activity.action}</div>
                  <div className="text-gray-600 text-sm">{activity.date}</div>
                </div>
                <div className={`font-semibold ${
                  activity.amount.startsWith('+$') ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Portfolio</h3>
          <div className="space-y-4">
            {[
              { name: 'Elite Enforcement Fund', value: '$100,000', growth: '+18.2%' },
              { name: 'Crypto Recovery Premium', value: '$35,000', growth: '+22.5%' },
              { name: 'Regulatory Compliance Bond', value: '$15,000', growth: '+12.8%' }
            ].map((investment, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{investment.name}</div>
                  <div className="text-gray-600">{investment.value}</div>
                </div>
                <div className="text-green-600 font-semibold">{investment.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Investment Dashboard with Premium Packages
export const InvestmentDashboard = ({ user }) => {
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  
  const investmentOptions = [
    {
      id: 1,
      name: 'Standard Enforcement Fund',
      description: 'Basic cryptocurrency enforcement and recovery investment with solid returns.',
      minInvestment: 10000,
      expectedReturn: '12-15%',
      duration: '3 months',
      riskLevel: 'Medium',
      apy: '15%',
      features: ['Basic enforcement support', 'Quarterly reports', 'Email support'],
      image: 'https://images.unsplash.com/photo-1648077195645-c122696bc331?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxqdXN0aWNlJTIwYXV0aG9yaXR5fGVufDB8fHxibHVlfDE3NTMwOTQ1NjV8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 2,
      name: 'Premium Crypto Recovery',
      description: 'Advanced crypto recovery operations with enhanced legal support and faster processing.',
      minInvestment: 50000,
      expectedReturn: '18-22%',
      duration: '3 months',
      riskLevel: 'Medium',
      apy: '22%',
      features: ['Priority case handling', 'Monthly reports', 'Phone & chat support', 'Basic legal consultation'],
      image: 'https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 3,
      name: '🔥 ELITE ENFORCEMENT FUND',
      description: 'Ultra-premium crypto enforcement package with direct lawyer access, 24/7 priority support, and maximum APY returns.',
      minInvestment: 100000,
      expectedReturn: '25-35%',
      duration: '3 months',
      riskLevel: 'High',
      apy: '35%',
      premium: true,
      features: [
        '🏆 Direct chat with CRED lawyers 24/7',
        '⚡ Priority enforcement processing',
        '📊 Weekly detailed reports',
        '🔒 Personal case manager assigned',
        '📞 Dedicated hotline access',
        '💼 VIP legal consultation included',
        '🚨 Emergency response team',
        '📈 Highest APY guaranteed'
      ],
      image: 'https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    }
  ];

  const handleInvest = (investment) => {
    if (investment.premium) {
      alert(`🔥 ELITE PACKAGE SELECTED! 
      
Investment: ${investment.name}
Amount: $${investment.minInvestment.toLocaleString()}+
Duration: ${investment.duration}
Expected APY: ${investment.apy}

✅ 24/7 Lawyer Chat Access ACTIVATED
✅ Priority Enforcement Processing
✅ Personal Case Manager Assigned
✅ VIP Legal Consultation Included

Our premium team will contact you within 1 hour to complete this elite investment setup.`);
    } else {
      alert(`Investment submitted for ${investment.name}. Our team will contact you within 24 hours to complete the secure transaction.`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CRED Premium Investment Packages</h2>
          <p className="text-gray-600 mt-2">All packages feature 3-month terms with guaranteed high APY returns</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Available Balance</div>
          <div className="text-2xl font-bold text-green-600">$500,000</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {investmentOptions.map(investment => (
          <div key={investment.id} className={`bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ${investment.premium ? 'ring-4 ring-yellow-400 relative' : ''}`}>
            {investment.premium && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                ⭐ PREMIUM
              </div>
            )}
            <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url(${investment.image})`}}>
              {investment.premium && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20"></div>
              )}
            </div>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-3 ${investment.premium ? 'text-yellow-600' : 'text-gray-900'}`}>
                {investment.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{investment.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Min. Investment:</span>
                  <span className="font-semibold">${investment.minInvestment.toLocaleString()}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold text-green-600">{investment.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">APY:</span>
                  <span className={`font-bold text-lg ${investment.premium ? 'text-yellow-600' : 'text-green-600'}`}>
                    {investment.apy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{investment.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className={`font-semibold ${
                    investment.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {investment.riskLevel}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Package Features:</h4>
                <ul className="space-y-1">
                  {investment.features.map((feature, index) => (
                    <li key={index} className={`text-xs ${investment.premium ? 'text-gray-700' : 'text-gray-600'} flex items-center`}>
                      <span className={`mr-2 ${investment.premium ? 'text-yellow-500' : 'text-green-500'}`}>
                        {investment.premium ? '⭐' : '✓'}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => handleInvest(investment)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                  investment.premium 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg' 
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                {investment.premium ? '🔥 INVEST ELITE' : 'Invest Securely'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Benefits Banner */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-3">🏆 ELITE PACKAGE EXCLUSIVE BENEFITS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-yellow-700">
            <span className="text-2xl mr-3">💬</span>
            <span><strong>24/7 Lawyer Chat:</strong> Direct access to CRED legal experts</span>
          </div>
          <div className="flex items-center text-yellow-700">
            <span className="text-2xl mr-3">⚡</span>
            <span><strong>Priority Processing:</strong> Your cases get immediate attention</span>
          </div>
          <div className="flex items-center text-yellow-700">
            <span className="text-2xl mr-3">🎯</span>
            <span><strong>35% APY:</strong> Highest guaranteed returns in 3 months</span>
          </div>
          <div className="flex items-center text-yellow-700">
            <span className="text-2xl mr-3">🔒</span>
            <span><strong>Personal Manager:</strong> Dedicated case management</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reports Section
const ReportsSection = ({ user }) => {
  const reports = [
    {
      id: 1,
      title: 'Cryptocurrency Enforcement Action Report',
      date: '2025-01-20',
      status: 'Completed',
      type: 'Enforcement',
      description: 'Comprehensive analysis of cryptocurrency violations and regulatory enforcement actions taken in Q4 2024.'
    },
    {
      id: 2,
      title: 'Digital Asset Recovery Progress Report',
      date: '2025-01-18',
      status: 'In Progress',
      type: 'Recovery',
      description: 'Status update on ongoing crypto asset recovery operations for Case #CRED-2024-256.'
    },
    {
      id: 3,
      title: 'Blockchain Security Compliance Audit',
      date: '2025-01-15',
      status: 'Completed',
      type: 'Compliance',
      description: 'Detailed compliance audit and recommendations for cryptocurrency exchange security protocols.'
    },
    {
      id: 4,
      title: 'Elite Package: Priority Investigation Report',
      date: '2025-01-12',
      status: 'Completed',
      type: 'Elite Premium',
      description: 'Exclusive high-priority investigation report for Elite package members with detailed forensic analysis.'
    }
  ];

  const downloadReport = (reportId) => {
    alert(`Downloading CRED enforcement report #${reportId}. The secure document will be available in your downloads folder.`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">CRED Enforcement Reports</h2>
      
      <div className="space-y-6">
        {reports.map(report => (
          <div key={report.id} className={`p-6 rounded-lg border ${report.type === 'Elite Premium' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 mr-3">{report.title}</h3>
                  {report.type === 'Elite Premium' && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">⭐ ELITE</span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{report.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Date: {report.date}</span>
                  <span>Type: {report.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    report.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => downloadReport(report.id)}
                disabled={report.status !== 'Completed'}
                className={`ml-4 px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                  report.status === 'Completed'
                    ? report.type === 'Elite Premium'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600'
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {report.status === 'Completed' ? 'Download' : 'Pending'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Section
const ProfileSection = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) CRED-911',
    address: '100 Crypto Enforcement Plaza, Washington DC 20515',
    notifications: true,
    twoFactor: true,
    eliteAccess: true
  });

  const handleSave = () => {
    setEditMode(false);
    alert('CRED profile updated successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">CRED Profile Settings</h2>
        <button 
          onClick={() => editMode ? handleSave() : setEditMode(true)}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
        >
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Agent Name</label>
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
            <label className="block text-gray-700 font-semibold mb-2">Emergency Hotline</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!editMode}
              className={`w-full p-3 border rounded-lg ${editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <textarea
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              disabled={!editMode}
              rows="3"
              className={`w-full p-3 border rounded-lg ${editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'}`}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h3>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-semibold text-gray-900">Enforcement Notifications</div>
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
            
            <div className="flex justify-between items-center mb-4">
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

            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-yellow-700">⭐ Elite Lawyer Access</div>
                <div className="text-gray-600 text-sm">24/7 direct chat with CRED lawyers</div>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Active
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">Account Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">CRED Member Since:</span>
                <span className="font-semibold">{user.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Account Type:</span>
                <span className="font-semibold text-yellow-600">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Active Investments:</span>
                <span className="font-semibold">{user.activeInvestments}</span>
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

// Live Chat Component
export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Agent Sarah from CRED. How can I assist you with your crypto enforcement needs today?", sender: 'agent', time: '10:30' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. Our crypto enforcement specialists are reviewing your case. For immediate assistance with elite packages, please mention your investment tier.",
          sender: 'agent',
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
        >
          {isOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">💬</span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border z-50">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm">🛡️</span>
              </div>
              <div>
                <div className="font-semibold">CRED Live Support</div>
                <div className="text-xs text-blue-200">● Online - Response time: ~2 min</div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm">{message.text}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crypto enforcement..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <span className="text-sm">📤</span>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              🔒 Secure chat • Elite members get priority support
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">🛡️</span>
              </div>
              <div>
                <span className="text-xl font-bold">CRED</span>
                <div className="text-xs text-gray-400">Crypto Regulatory Enforcement</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Protecting justice and regulatory compliance in the cryptocurrency ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📧</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📱</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">🔗</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">CRED Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition duration-300">Crypto Investigation</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Compliance Monitoring</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Asset Recovery</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Enforcement Reports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Agency</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition duration-300">About CRED</Link></li>
              <li><Link to="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact CRED</h3>
            <ul className="space-y-2 text-gray-400">
              <li>🏛️ 100 Crypto Enforcement Plaza</li>
              <li>Washington, DC 20515</li>
              <li>📞 +1 (800) CRYPTO-1</li>
              <li>✉️ enforcement@cred.gov</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 CRED - Crypto Regulatory Enforcement Division. All rights reserved. | Securing the crypto ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
};