import React, { useState } from 'react';

// Live Chat Component (Mobile-friendly)
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
        const responses = [
          "Thank you for contacting CRED. I'm reviewing your case details now.",
          "For urgent crypto crime matters, please provide your case reference number.",
          "Our elite package members receive priority support. Are you a premium member?",
          "I'm connecting you with our investigation specialists. Please hold.",
          "For investment inquiries, I can connect you with our finance team."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const agentResponse = {
          id: messages.length + 2,
          text: randomResponse,
          sender: 'agent',
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1500);
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
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
        >
          {isOpen ? (
            <span className="text-lg sm:text-xl">✕</span>
          ) : (
            <span className="text-lg sm:text-xl">💬</span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-24 right-4 sm:right-6 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border z-50 max-h-[70vh] flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg flex-shrink-0">
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-800 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-xs sm:text-sm">🛡️</span>
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">CRED Live Support</div>
                <div className="text-xs text-blue-200">● Online - Response time: ~2 min</div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 min-h-0" style={{maxHeight: 'calc(70vh - 140px)'}}>
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-2 sm:p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-xs sm:text-sm">{message.text}</div>
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
          <div className="border-t p-3 sm:p-4 flex-shrink-0">
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