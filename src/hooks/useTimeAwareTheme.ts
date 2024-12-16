import { useState, useEffect, useCallback } from 'react';
import { ThemeType } from '../types/settings';
import { isNightTime } from '../utils/time/dateTime';

interface UseTimeAwareThemeProps {
  autoTheme: boolean;
  manualTheme: ThemeType;
}

export const useTimeAwareTheme = ({ 
  autoTheme, 
  manualTheme 
}: UseTimeAwareThemeProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    if (autoTheme) {
      return isNightTime() ? 'dark' : 'light';
    }
    return manualTheme;
  });

  const updateTheme = useCallback(() => {
    if (autoTheme) {
      setCurrentTheme(isNightTime() ? 'dark' : 'light');
    } else {
      setCurrentTheme(manualTheme);
    }
  }, [autoTheme, manualTheme]);

  useEffect(() => {
    updateTheme();

    if (autoTheme) {
      const interval = setInterval(updateTheme, 60000);
      return () => clearInterval(interval);
    }
  }, [autoTheme, manualTheme, updateTheme]);

  return currentTheme;
};