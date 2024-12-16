import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import { ThemeType } from '../../types/settings';

interface ThemeToggleProps {
  theme: ThemeType;
  autoTheme: boolean;
  onThemeChange: (theme: ThemeType) => void;
  onAutoThemeChange: (enabled: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  autoTheme,
  onThemeChange,
  onAutoThemeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-full transition-colors ${
              !autoTheme && theme === 'dark'
                ? 'bg-gray-800 text-yellow-400'
                : !autoTheme && theme === 'light'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-200 text-gray-400'
            }`}
            disabled={autoTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Auto Day/Night
        </label>
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${
            autoTheme ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={autoTheme}
              onChange={(e) => onAutoThemeChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};