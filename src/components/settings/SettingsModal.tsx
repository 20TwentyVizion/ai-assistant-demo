import React from 'react';
import { X } from 'lucide-react';
import { ChatbotSettings, PersonalityType, ToneType } from '../../types/settings';
import { VoiceSettings } from './VoiceSettings';
import { ThemeToggle } from './ThemeToggle';
import { ProfileSettings } from './ProfileSettings';
import { HolidayModeToggle } from './HolidayModeToggle';
import { ResetOptions } from './ResetOptions';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ChatbotSettings;
  onSettingsChange: (settings: ChatbotSettings) => void;
  onResetChat: () => void;
  onRestoreDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onResetChat,
  onRestoreDefaults,
}) => {
  if (!isOpen) return null;

  const handleThemeChange = (theme: 'light' | 'dark') => {
    onSettingsChange({
      ...settings,
      theme: {
        ...settings.theme,
        theme
      }
    });
  };

  const handleAutoThemeChange = (autoTheme: boolean) => {
    onSettingsChange({
      ...settings,
      theme: {
        ...settings.theme,
        autoTheme
      }
    });
  };

  const handleHolidayModeChange = (enabled: boolean) => {
    onSettingsChange({
      ...settings,
      theme: {
        ...settings.theme,
        holidayMode: enabled
      }
    });
  };

  const handleChange = <K extends keyof ChatbotSettings>(
    key: K,
    value: ChatbotSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fadeIn max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="space-y-6">
            <ThemeToggle
              theme={settings.theme.theme}
              autoTheme={settings.theme.autoTheme}
              onThemeChange={handleThemeChange}
              onAutoThemeChange={handleAutoThemeChange}
            />

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <HolidayModeToggle
                enabled={settings.theme.holidayMode}
                onToggle={handleHolidayModeChange}
                currentHoliday={null} // TODO: Pass current holiday from timeService
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Profile</h3>
              <ProfileSettings
                profile={settings.profile}
                onChange={(profile) => handleChange('profile', profile)}
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Chatbot Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Personality
                  </label>
                  <select
                    value={settings.personality}
                    onChange={(e) => handleChange('personality', e.target.value as PersonalityType)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="friendly">Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="humorous">Humorous</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Response Tone
                  </label>
                  <select
                    value={settings.tone}
                    onChange={(e) => handleChange('tone', e.target.value as ToneType)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                    <option value="motivational">Motivational</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Use Emojis
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.useEmojis}
                      onChange={(e) => handleChange('useEmojis', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Voice Settings</h3>
              <VoiceSettings
                enabled={settings.voice.enabled}
                type={settings.voice.type}
                pitch={settings.voice.pitch}
                rate={settings.voice.rate}
                onVoiceChange={(type) => handleChange('voice', { ...settings.voice, type })}
                onToggleVoice={(enabled) => handleChange('voice', { ...settings.voice, enabled })}
                onPitchChange={(pitch) => handleChange('voice', { ...settings.voice, pitch })}
                onRateChange={(rate) => handleChange('voice', { ...settings.voice, rate })}
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <ResetOptions
                onResetChat={onResetChat}
                onRestoreDefaults={onRestoreDefaults}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};