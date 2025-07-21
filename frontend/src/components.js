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
    </div>
  );
};

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Global Justice Authority</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established to uphold the highest standards of justice, integrity, and legal excellence in the digital age.
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
              At Global Justice Authority, we specialize in providing cutting-edge solutions to detect, prevent, and investigate financial crimes and fraudulent activities. Our expert team of analysts, investigators, and legal specialists work tirelessly to protect your assets and safeguard the integrity of digital transactions.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're facing issues with suspicious transactions, financial fraud, money laundering, or asset recovery, we leverage advanced tools and proven strategies to bring transparency, accountability, and justice to complex financial investigations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">500+</div>
                <div className="text-blue-700">Cases Solved</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">$50M+</div>
                <div className="text-blue-700">Assets Recovered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for financial investigation, fraud detection, and asset recovery.
          </p>
        </div>
        
        <ServicesSection detailed={true} />
      </div>
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
    alert('Thank you for your message. We will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our expert team</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Headquarters</div>
                  <div className="text-gray-600">1600 Pennsylvania Avenue NW, Washington, DC 20500</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-600">+1 (555) JUSTICE</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">✉️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">contact@globaljusticeauthority.com</div>
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
                <span className="text-white text-xl font-bold">⚖️</span>
              </div>
              <span className="text-xl font-bold">Global Justice Authority</span>
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
              ABOUT US
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
          Welcome to the Global<br />
          <span className="text-blue-400">Justice Authority</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
          At Global Justice Authority, we specialize in providing cutting-edge solutions to detect, prevent, and 
          investigate financial crimes within the digital space. Our expert team of analysts, investigators, and 
          legal specialists work tirelessly to protect your assets and safeguard the integrity of financial 
          technology. Whether you're facing issues with fraudulent transactions, cyber financial crimes, money 
          laundering, or asset recovery, we leverage advanced tools and proven strategies to bring transparency, 
          accountability, and justice to the financial ecosystem. With a focus on innovation and regulatory 
          compliance, we help our clients navigate the complex world of digital finance with confidence. 
          Let us be your first line of defense in the fight against financial crime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Submit a Claim
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
      title: 'Financial Investigation',
      description: detailed 
        ? 'Comprehensive forensic analysis of financial transactions, identifying patterns of suspicious activity and tracking fund movements across multiple platforms and jurisdictions.' 
        : 'Financial crimes are everywhere. It\'s important to be careful in the digital space, but if you\'ve lost your money to financial fraud, we can help you on the road to asset recovery.',
      image: 'https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '🛡️',
      title: 'Fraud Detection',
      description: detailed
        ? 'Advanced monitoring systems and AI-powered analysis to detect fraudulent activities in real-time, protecting your assets before damage occurs.'
        : 'Is your financial platform the real deal? Is that investment opportunity legitimate? The digital landscape can seem like a jungle and you may find yourself asking, "Is this a scam?"',
      image: 'https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '💰',
      title: 'Asset Recovery',
      description: detailed
        ? 'Specialized recovery services for stolen or misappropriated assets, utilizing legal channels and advanced tracing techniques to recover your funds.'
        : 'Have you lost your assets to a fake platform? Did a financial merchant never deliver your investment returns? Fight back with asset recovery methods that will get your money back.',
      image: 'https://images.unsplash.com/photo-1619806677949-cbae91e82cea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjb3VydGhvdXNlfGVufDB8fHxibHVlfDE3NTMwOTQ1ODd8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: '📋',
      title: 'Investigation Report',
      description: detailed
        ? 'Detailed forensic reports that provide comprehensive analysis of financial crimes, suitable for legal proceedings and regulatory compliance.'
        : 'We will summarize our extensive financial investigation results in a report that will give you a head start with law enforcement recovery. Our investigation reports are crucial to getting authorities interested in your case.',
      image: 'https://images.unsplash.com/photo-1720480916424-ff20c676d61d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjb3VydGhvdXNlfGVufDB8fHxibHVlfDE3NTMwOTQ1ODd8MA&ixlib=rb-4.1.0&q=85'
    }
  ];

  return (
    <div className={`${detailed ? '' : 'py-20'} bg-gray-50`}>
      <div className="max-w-7xl mx-auto px-4">
        {!detailed && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for financial investigation and justice</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Protecting Justice in the Digital Age</h2>
            <p className="text-gray-700 mb-6 text-lg">
              With over a decade of experience in financial investigation and law enforcement, Global Justice Authority 
              stands at the forefront of digital crime prevention and asset recovery.
            </p>
            <p className="text-gray-700 mb-8 text-lg">
              Our team combines traditional investigative expertise with cutting-edge technology to deliver results 
              that matter. We've successfully recovered millions in assets and brought justice to countless victims 
              of financial crimes.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-900">500+</div>
                <div className="text-gray-600">Cases Solved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">$50M+</div>
                <div className="text-gray-600">Recovered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">98%</div>
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
        <h2 className="text-4xl font-bold mb-8">Ready to Seek Justice?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Don't let financial criminals get away with your hard-earned assets. Contact our expert team today 
          and take the first step towards recovery and justice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Contact Us Now
          </Link>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-800 transition duration-300 transform hover:scale-105">
            Emergency Hotline
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
      name: formData.name || 'John Smith',
      email: formData.email,
      role: 'Premium Member',
      joinDate: '2025-01-01',
      totalInvestment: 25000,
      activeInvestments: 3,
      returns: 2850
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
        
        <h2 className="text-2xl font-bold text-center mb-8">
          {isLoginMode ? 'Sign In' : 'Sign Up'}
        </h2>
        
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
            {isLoginMode ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-2">Member since {user.joinDate}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">${user.totalInvestment.toLocaleString()}</div>
              <div className="text-gray-600">Total Investment</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'investments', label: 'Secure Investments' },
              { id: 'reports', label: 'Investigation Reports' },
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
    </div>
  );
};

// Dashboard Overview
const DashboardOverview = ({ user }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-blue-900">{user.activeInvestments}</div>
          <div className="text-blue-700">Active Investments</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-green-900">${user.returns.toLocaleString()}</div>
          <div className="text-green-700">Total Returns</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="text-2xl font-bold text-purple-900">+12.4%</div>
          <div className="text-purple-700">Average ROI</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Investment in Justice Fund', amount: '+$5,000', date: '2025-01-20' },
              { action: 'Return from Security Bond', amount: '+$850', date: '2025-01-18' },
              { action: 'Investigation Report Generated', amount: 'Complete', date: '2025-01-15' }
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
              { name: 'Justice Development Fund', value: '$15,000', growth: '+8.2%' },
              { name: 'Security Infrastructure Bond', value: '$7,500', growth: '+15.1%' },
              { name: 'Legal Technology Investment', value: '$2,500', growth: '+22.3%' }
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

// Investment Dashboard
export const InvestmentDashboard = ({ user }) => {
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  
  const investmentOptions = [
    {
      id: 1,
      name: 'Justice Development Fund',
      description: 'Invest in the development of justice infrastructure and legal technology solutions.',
      minInvestment: 1000,
      expectedReturn: '8-12%',
      duration: '12 months',
      riskLevel: 'Medium',
      image: 'https://images.unsplash.com/photo-1648077195645-c122696bc331?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxqdXN0aWNlJTIwYXV0aG9yaXR5fGVufDB8fHxibHVlfDE3NTMwOTQ1NjV8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 2,
      name: 'Security Infrastructure Bond',
      description: 'Government-backed securities focused on cybersecurity and digital infrastructure.',
      minInvestment: 5000,
      expectedReturn: '6-10%',
      duration: '24 months',
      riskLevel: 'Low',
      image: 'https://images.unsplash.com/photo-1660732106134-f3009a1e90ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 3,
      name: 'Legal Technology Venture',
      description: 'High-growth investment in cutting-edge legal and investigation technologies.',
      minInvestment: 2500,
      expectedReturn: '15-25%',
      duration: '36 months',
      riskLevel: 'High',
      image: 'https://images.unsplash.com/photo-1593407089396-93f0c7a575f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MHx8fGJsdWV8MTc1MzA5NDU5NHww&ixlib=rb-4.1.0&q=85'
    }
  ];

  const handleInvest = (investment) => {
    alert(`Investment submitted for ${investment.name}. Our team will contact you within 24 hours to complete the secure transaction.`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Secure Investment Opportunities</h2>
        <div className="text-right">
          <div className="text-sm text-gray-600">Available Balance</div>
          <div className="text-2xl font-bold text-green-600">$50,000</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {investmentOptions.map(investment => (
          <div key={investment.id} className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${investment.image})`}}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{investment.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{investment.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Min. Investment:</span>
                  <span className="font-semibold">${investment.minInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold text-green-600">{investment.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{investment.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className={`font-semibold ${
                    investment.riskLevel === 'Low' ? 'text-green-600' :
                    investment.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {investment.riskLevel}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handleInvest(investment)}
                className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
              >
                Invest Securely
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reports Section
const ReportsSection = ({ user }) => {
  const reports = [
    {
      id: 1,
      title: 'Financial Transaction Analysis Report',
      date: '2025-01-20',
      status: 'Completed',
      type: 'Investigation',
      description: 'Comprehensive analysis of suspicious financial activities detected in Q4 2024.'
    },
    {
      id: 2,
      title: 'Asset Recovery Progress Report',
      date: '2025-01-18',
      status: 'In Progress',
      type: 'Recovery',
      description: 'Status update on ongoing asset recovery operations for Case #JA-2024-156.'
    },
    {
      id: 3,
      title: 'Cybersecurity Threat Assessment',
      date: '2025-01-15',
      status: 'Completed',
      type: 'Security',
      description: 'Detailed security analysis and recommendations for digital asset protection.'
    }
  ];

  const downloadReport = (reportId) => {
    alert(`Downloading report #${reportId}. The secure document will be available in your downloads folder.`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Investigation Reports</h2>
      
      <div className="space-y-6">
        {reports.map(report => (
          <div key={report.id} className="bg-gray-50 p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
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
                    ? 'bg-blue-900 text-white hover:bg-blue-800'
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
    phone: '+1 (555) 123-4567',
    address: '123 Justice Street, Washington DC 20001',
    notifications: true,
    twoFactor: true
  });

  const handleSave = () => {
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
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
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
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
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Security</h3>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-semibold text-gray-900">Email Notifications</div>
                <div className="text-gray-600 text-sm">Receive updates about your investments</div>
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
            
            <div className="flex justify-between items-center">
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
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-semibold">{user.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Type:</span>
                <span className="font-semibold text-blue-600">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investments:</span>
                <span className="font-semibold">{user.activeInvestments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate:</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                <span className="text-white text-xl font-bold">⚖️</span>
              </div>
              <span className="text-xl font-bold">Global Justice Authority</span>
            </div>
            <p className="text-gray-400 mb-4">
              Protecting justice and integrity in the digital financial ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📧</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📱</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">🔗</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition duration-300">Financial Investigation</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Fraud Detection</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Asset Recovery</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Investigation Reports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 1600 Pennsylvania Avenue NW</li>
              <li>Washington, DC 20500</li>
              <li>📞 +1 (555) JUSTICE</li>
              <li>✉️ contact@globaljusticeauthority.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Global Justice Authority. All rights reserved. | Protecting justice in the digital age.
          </p>
        </div>
      </div>
    </footer>
  );
};