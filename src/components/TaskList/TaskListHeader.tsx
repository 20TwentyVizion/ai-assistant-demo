import React from 'react';
import { ChevronDown, ChevronUp, ClipboardList } from 'lucide-react';
import { ThemeType } from '../../types/settings';

interface TaskListHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTasks: number;
  completedTasks: number;
  theme?: ThemeType;
}

export const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  isCollapsed,
  onToggle,
  activeTasks,
  completedTasks,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center justify-between p-4 ${
      isDark ? 'bg-gray-800' : 'bg-gray-50'
    } border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-blue-500" />
        <h2 className={`text-lg font-semibold ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>Tasks</h2>
        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          ({activeTasks} active, {completedTasks} completed)
        </span>
      </div>
      
      <button
        onClick={onToggle}
        className={`p-2 ${
          isDark 
            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        } rounded-full transition-colors`}
        title={isCollapsed ? 'Expand tasks' : 'Collapse tasks'}
      >
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};