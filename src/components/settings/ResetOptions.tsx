import React from 'react';
import { Trash2, RotateCcw } from 'lucide-react';

interface ResetOptionsProps {
  onResetChat: () => void;
  onRestoreDefaults: () => void;
}

export const ResetOptions: React.FC<ResetOptionsProps> = ({
  onResetChat,
  onRestoreDefaults,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Reset Options
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Clear Chat History
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Delete all chat messages and start fresh
              </p>
            </div>
          </div>
          <button
            onClick={onResetChat}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-yellow-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Restore Default Settings
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reset all settings to their original values
              </p>
            </div>
          </div>
          <button
            onClick={onRestoreDefaults}
            className="px-3 py-1 text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};