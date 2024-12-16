import React, { useState } from 'react';
import { UserProfile } from '../../types/settings';
import { X } from 'lucide-react';

interface ProfileSettingsProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profile,
  onChange,
}) => {
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim()) {
      onChange({
        ...profile,
        interests: [...profile.interests, newInterest.trim()],
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index: number) => {
    onChange({
      ...profile,
      interests: profile.interests.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => onChange({ ...profile, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Birthday
        </label>
        <input
          type="date"
          value={profile.birthday?.toISOString().split('T')[0] || ''}
          onChange={(e) => onChange({ ...profile, birthday: new Date(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bot Name
        </label>
        <input
          type="text"
          value={profile.botName}
          onChange={(e) => onChange({ ...profile, botName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Name your AI assistant"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests
        </label>
        <form onSubmit={handleAddInterest} className="flex gap-2 mb-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add an interest"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
            >
              <span className="text-sm">{interest}</span>
              <button
                onClick={() => handleRemoveInterest(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};