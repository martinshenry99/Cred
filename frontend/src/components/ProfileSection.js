import React, { useState } from 'react';

export const ProfileSection = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '+1 (555) CRED-911',
    notifications: true,
    twoFactor: true
  });

  const handleSave = () => {
    setEditMode(false);
    alert('CRED profile updated successfully!');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Profile Settings</h2>
        <button 
          onClick={() => editMode ? handleSave() : setEditMode(true)}
          className="bg-blue-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 text-sm sm:text-base"
        >
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
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
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Account Security</h3>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-semibold text-gray-900">Notifications</div>
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
          
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">Account Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">CRED Member Since:</span>
                <span className="font-semibold">{new Date(user.created_at || '2025-01-01').toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Account Status:</span>
                <span className="font-semibold text-blue-600">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Investments:</span>
                <span className="font-semibold">{user.active_investments || 0}</span>
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