import { useEffect, useState } from 'react';
import { Holiday } from '../types/time';
import { holidayThemes } from '../utils/theme/holidayThemes';

export const useHolidayTheme = (
  holidayMode: boolean,
  currentHoliday: Holiday | null
) => {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    if (!holidayMode || !currentHoliday) {
      setTheme(null);
      return;
    }

    const holidayName = currentHoliday.name.toLowerCase();
    const holidayTheme = holidayThemes[holidayName];
    
    if (holidayTheme) {
      setTheme(holidayTheme);
      
      // Apply holiday-specific animations
      if (holidayTheme.animations) {
        document.documentElement.classList.add(...holidayTheme.animations);
      }
      
      // Apply holiday background pattern
      if (holidayTheme.backgroundPattern) {
        document.body.style.backgroundImage = `url(${holidayTheme.backgroundPattern})`;
      }
    }

    return () => {
      // Cleanup animations and background
      if (holidayTheme?.animations) {
        document.documentElement.classList.remove(...holidayTheme.animations);
      }
      document.body.style.backgroundImage = '';
    };
  }, [holidayMode, currentHoliday]);

  return theme;
};