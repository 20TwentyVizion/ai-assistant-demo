import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { CalendarEvent } from '../../../types/calendar';
import { Task } from '../../../types';
import { Holiday } from '../../../types/time';

interface DateCellProps {
  date: Date;
  currentMonth: Date;
  events: CalendarEvent[];
  tasks: Task[];
  holidays: Holiday[];
  isBirthday?: boolean;
  onSelect: (date: Date) => void;
}

export const DateCell: React.FC<DateCellProps> = ({
  date,
  currentMonth,
  events,
  tasks,
  holidays,
  isBirthday,
  onSelect,
}) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);

  return (
    <div
      onClick={() => onSelect(date)}
      className={`h-12 p-1 border border-gray-200 dark:border-gray-700 ${
        isCurrentMonth 
          ? 'bg-white dark:bg-gray-800' 
          : 'bg-gray-50 dark:bg-gray-900'
      } ${isCurrentDay ? 'ring-2 ring-blue-500' : ''} 
      cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 relative`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm ${
          isCurrentMonth 
            ? 'text-gray-900 dark:text-gray-100' 
            : 'text-gray-400 dark:text-gray-500'
        }`}>
          {format(date, 'd')}
        </span>
        {isBirthday && (
          <span className="text-pink-500 text-xs">🎂</span>
        )}
      </div>
      
      {(events.length > 0 || tasks.length > 0 || holidays.length > 0) && (
        <div className="absolute bottom-1 right-1 flex gap-1">
          {holidays.length > 0 && (
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          )}
          {events.length > 0 && (
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          )}
          {tasks.length > 0 && (
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          )}
        </div>
      )}
    </div>
  );
};