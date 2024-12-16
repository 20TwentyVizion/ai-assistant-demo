import { useState, useEffect } from 'react';
import { ChatbotSettings, defaultSettings } from '../types/settings';

const SETTINGS_KEY = 'chatbot-settings';

export const useSettings = () => {
  const [settings, setSettings] = useState<ChatbotSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSettings,
          ...parsed,
          voice: {
            ...defaultSettings.voice,
            ...parsed.voice,
          },
        };
      }
      return defaultSettings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return { 
    settings, 
    setSettings,
    resetSettings
  };
};