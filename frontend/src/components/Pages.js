import React, { useState } from 'react';
import { Hero } from './Hero';
import { CryptoPricesSection, ServicesSection, AboutSection, ContactSection, TestimonialsSection, FAQSection } from './Sections';
import { LiveChat } from './Chat';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Main Pages Components
export const Home = ({ cryptoPrices, user, onNavigateToDashboard, onShowLogin }) => {
  return (
    <div className="min-h-screen">
      <Hero 
        user={user}
        onNavigateToDashboard={onNavigateToDashboard}
        onShowLogin={onShowLogin}
      />
      <ServicesSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <LiveChat />
    </div>
  );
};

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">About CRED</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Crypto Regulatory Enforcement Division - Upholding the highest standards of regulatory compliance and security.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-12">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1560250163-17506787d971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fGJsdWV8MTc1MzAzOTE1NHww&ixlib=rb-4.1.0&q=85"
              alt="CRED Team"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              At CRED, we specialize in cryptocurrency enforcement, regulatory compliance, and digital asset recovery. 
              Our expert team of analysts, investigators, and legal specialists work tirelessly to protect the 
              cryptocurrency ecosystem and ensure regulatory compliance.
            </p>
            <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
              We leverage advanced blockchain analysis tools and proven enforcement strategies to bring transparency, 
              accountability, and justice to the digital asset space.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-blue-900">750+</div>
                <div className="text-xs sm:text-sm text-blue-700">Crypto Cases</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-blue-900">$120M+</div>
                <div className="text-xs sm:text-sm text-blue-700">Recovered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">CRED Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
              <p className="text-sm text-gray-600">Protecting digital assets through advanced security measures</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">⚖️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Justice</h4>
              <p className="text-sm text-gray-600">Ensuring fair enforcement and regulatory compliance</p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🔍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Investigation</h4>
              <p className="text-sm text-gray-600">Thorough analysis and investigation of crypto crimes</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">CRED Services</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive crypto regulatory enforcement and compliance solutions.
          </p>
        </div>
        
        <ServicesSection detailed={true} />
        
        {/* Additional Service Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Why Choose CRED?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Government Backed</h4>
                <p className="text-sm text-gray-600">Official regulatory enforcement with federal authority</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Expert Team</h4>
                <p className="text-sm text-gray-600">Specialized investigators and legal professionals</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                <p className="text-sm text-gray-600">Round-the-clock assistance for urgent matters</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">High Success Rate</h4>
                <p className="text-sm text-gray-600">99% success rate in crypto asset recovery</p>
              </div>
            </div>
          </div>
        </div>
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Thank you for your message. Our CRED team will respond within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Contact CRED</h1>
          <p className="text-lg sm:text-xl text-gray-600">Get in touch with our crypto enforcement experts</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-lg sm:text-xl">🏛️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">CRED Headquarters</div>
                  <div className="text-sm sm:text-base text-gray-600">100 Crypto Enforcement Plaza<br />Washington, DC 20515</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-lg sm:text-xl">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">CRED Hotline</div>
                  <div className="text-sm sm:text-base text-gray-600">+1 (226) 484-9213</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-lg sm:text-xl">✉️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-sm sm:text-base text-gray-600">cred.investigation@usa.com</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Emergency Crypto Crime Reporting</h3>
              <p className="text-sm text-red-700 mb-3">
                For urgent crypto crime incidents requiring immediate attention, use our emergency hotline.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition duration-300">
                Call Emergency Line
              </button>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 disabled:opacity-50 text-sm sm:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
  );
};