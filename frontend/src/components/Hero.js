import React from 'react';

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
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
          Welcome to <span className="text-blue-400">CRED</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-blue-200">
          Crypto Regulatory Enforcement Division
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
          At CRED, we specialize in providing cutting-edge solutions to detect, prevent, and investigate 
          cryptocurrency crimes. Our expert team of regulatory analysts, investigators, and legal specialists 
          work tirelessly to protect your crypto assets and ensure compliance with federal regulations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <button className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Report Crypto Crime
          </button>
          <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-slate-800 transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};