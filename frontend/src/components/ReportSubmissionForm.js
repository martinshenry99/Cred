import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ReportSubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'fraud',
    priority: 'medium'
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('priority', formData.priority);
      
      attachments.forEach(file => {
        submitData.append('attachments', file);
      });

      const response = await axios.post(`${API}/reports/submit`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Report submitted successfully! Our investigation team will review it within 24 hours.');
      setFormData({ title: '', description: '', category: 'fraud', priority: 'medium' });
      setAttachments([]);
      onSubmit();
    } catch (error) {
      alert('Failed to submit report: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📋 Submit Investigation Report</h2>
        <p className="text-red-100">Report crypto crimes and request professional investigation</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fraud">Crypto Fraud</option>
                <option value="scam">Investment Scam</option>
                <option value="theft">Asset Theft</option>
                <option value="ransomware">Ransomware</option>
                <option value="exchange">Exchange Issues</option>
                <option value="romance">Romance Scam</option>
                <option value="phishing">Phishing Attack</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the incident"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
            <textarea
              rows="6"
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide detailed information about the incident, including dates, amounts, wallet addresses, transaction hashes, and any other relevant details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onChange={(e) => setAttachments(Array.from(e.target.files))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB each)
            </p>
            {attachments.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected files:</p>
                <ul className="text-xs text-gray-500">
                  {attachments.map((file, index) => (
                    <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Report...' : 'Submit Investigation Report'}
          </button>
        </form>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">📧 What happens next?</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Your report is immediately sent to our investigation team</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>You'll receive email confirmation within minutes</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Our team will review and respond within 24 hours</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2">•</span>
            <span>Track progress and communicate through this dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};