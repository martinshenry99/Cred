import React from 'react';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Background with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1546104294-d656c99943fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwYXV0aG9yaXR5fGVufDB8fHxibHVlfDE3NTMwOTQ1NjV8MA&ixlib=rb-4.1.0&q=85')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 backdrop-blur-sm mb-6">
          <span className="text-sm font-medium text-blue-300">🛡️ Official Government Agency</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            CRED
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-blue-200 font-light">
          Crypto Regulatory Enforcement Division
        </p>
        
        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
          Leading the fight against cryptocurrency crime with cutting-edge blockchain forensics, 
          international law enforcement coordination, and{' '}
          <span className="text-cyan-400 font-semibold">94% recovery success rate</span>
        </p>
        
        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-8 sm:mb-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400">$200M+</div>
            <div className="text-sm text-gray-400">Recovered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-400">3,000+</div>
            <div className="text-sm text-gray-400">Cases Solved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">🚨 Report Crypto Crime</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="group relative border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10">
            <span className="relative z-10">📊 Investment Portal</span>
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Licensed & Regulated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>International Cooperation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Advanced Forensics</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};