import React, { useState } from 'react';
import { Bot } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: (name: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <Bot className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome!
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Let's get started by getting to know you. You can customize more preferences later in settings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};