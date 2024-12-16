import { useEffect } from 'react';
import { useTimeAwareTheme } from './useTimeAwareTheme';
import { ThemeSettings } from '../types/settings';

export const useTheme = (themeSettings: ThemeSettings) => {
  const currentTheme = useTimeAwareTheme({ 
    autoTheme: themeSettings.autoTheme, 
    manualTheme: themeSettings.theme 
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return currentTheme;
};