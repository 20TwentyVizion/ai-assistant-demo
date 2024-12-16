import React from 'react';
import { ViewMode } from '../../../types/calendar';

interface ViewModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onModeChange('day')}
        className={`px-3 py-1 text-sm transition-colors ${
          mode === 'day'
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        }`}
      >
        Day
      </button>
      <button
        onClick={() => onModeChange('month')}
        className={`px-3 py-1 text-sm transition-colors ${
          mode === 'month'
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        }`}
      >
        Month
      </button>
    </div>
  );
};