import React from 'react';
import { ClipboardList, ChevronUp } from 'lucide-react';
import { ThemeType } from '../../types/settings';

interface CollapsedTaskBarProps {
  onExpand: () => void;
  activeTasks: number;
  theme?: ThemeType;
}

export const CollapsedTaskBar: React.FC<CollapsedTaskBarProps> = ({
  onExpand,
  activeTasks,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onExpand}
      className={`w-full p-3 ${
        isDark 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
          : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
      } border-t transition-colors group`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-500" />
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {activeTasks} active {activeTasks === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        <ChevronUp className={`w-5 h-5 ${
          isDark 
            ? 'text-gray-500 group-hover:text-gray-300'
            : 'text-gray-400 group-hover:text-gray-600'
        } transition-colors`} />
      </div>
    </button>
  );
};