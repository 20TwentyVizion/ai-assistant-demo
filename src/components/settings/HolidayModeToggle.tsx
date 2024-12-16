import React from 'react';
import { PartyPopper } from 'lucide-react';
import { Holiday } from '../../types/time';
import { holidayThemes } from '../../utils/theme/holidayThemes';

interface HolidayModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  currentHoliday: Holiday | null;
}

export const HolidayModeToggle: React.FC<HolidayModeToggleProps> = ({
  enabled = false,
  onToggle,
  currentHoliday,
}) => {
  const holidayName = currentHoliday?.name.toLowerCase();
  const theme = holidayName ? holidayThemes[holidayName] : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PartyPopper className={`w-5 h-5 ${
            enabled ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Holiday Mode
          </label>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {enabled && currentHoliday && (
        <div className={`p-3 rounded-lg ${theme?.colors.background || 'bg-gray-50'} border border-gray-200 dark:border-gray-700`}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {`Currently themed for ${currentHoliday.name}! ${theme?.icons?.calendar || '🎉'}`}
          </p>
        </div>
      )}

      {enabled && !currentHoliday && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No holiday theme available right now. The app will automatically update on the next holiday!
        </p>
      )}
    </div>
  );
};