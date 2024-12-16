import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onClose?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={onToday}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Today
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};