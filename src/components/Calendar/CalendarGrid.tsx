import React from 'react';
import { format, startOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';
import { CalendarEvent } from '../../types/calendar';
import { Task } from '../../types';
import { Holiday } from '../../types/time';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks: Task[];
  holidays: Holiday[];
  birthday?: Date;
  onSelectDate: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  tasks,
  holidays,
  birthday,
  onSelectDate,
}) => {
  const startDate = startOfWeek(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCell = (date: Date) => {
    const dayEvents = events.filter(event => isSameDay(new Date(event.date), date));
    const dayTasks = tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), date));
    const dayHolidays = holidays.filter(holiday => isSameDay(new Date(holiday.date), date));
    const isBirthday = birthday && isSameDay(new Date(birthday), date);

    const isCurrentMonth = isSameMonth(date, currentDate);
    const isCurrentDay = isToday(date);

    return (
      <div
        key={date.toISOString()}
        onClick={() => onSelectDate(date)}
        className={`h-14 p-1 border border-gray-200 dark:border-gray-700 ${
          isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
        } ${isCurrentDay ? 'ring-2 ring-blue-500' : ''} cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 relative`}
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {format(date, 'd')}
          </span>
          {isBirthday && (
            <span className="text-pink-500 text-xs">🎂</span>
          )}
        </div>
        
        {(dayEvents.length > 0 || dayTasks.length > 0 || dayHolidays.length > 0) && (
          <div className="absolute bottom-1 right-1 flex gap-1">
            {dayHolidays.length > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
            {dayEvents.length > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            )}
            {dayTasks.length > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }, (_, i) => {
          const date = addDays(startDate, i);
          return renderCell(date);
        })}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Today's Events
        </h3>
        <div className="space-y-2">
          {events
            .filter(event => isSameDay(new Date(event.date), new Date()))
            .map(event => (
              <div key={event.id} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-700 dark:text-blue-300">{event.title}</p>
                {event.startTime && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">{event.startTime}</p>
                )}
              </div>
            ))}
          {tasks
            .filter(task => task.dueDate && isSameDay(new Date(task.dueDate), new Date()))
            .map(task => (
              <div key={task.id} className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                <p className="text-sm text-green-700 dark:text-green-300">{task.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};