import React, { useState } from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent } from '../../types/calendar';
import { Task } from '../../types';
import { Holiday } from '../../types/time';
import { Calendar as CalendarIcon, Clock, CheckSquare, Bell } from 'lucide-react';

interface EventsViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks: Task[];
  holidays: Holiday[];
  viewMode: 'day' | 'month';
}

export const EventsView: React.FC<EventsViewProps> = ({
  currentDate,
  events,
  tasks,
  holidays,
  viewMode,
}) => {
  const filteredEvents = events.filter(event => 
    viewMode === 'day' 
      ? isSameDay(new Date(event.date), currentDate)
      : isSameMonth(new Date(event.date), currentDate)
  );

  const filteredTasks = tasks.filter(task => 
    task.dueDate && (viewMode === 'day'
      ? isSameDay(new Date(task.dueDate), currentDate)
      : isSameMonth(new Date(task.dueDate), currentDate))
  );

  const filteredHolidays = holidays.filter(holiday =>
    viewMode === 'day'
      ? isSameDay(new Date(holiday.date), currentDate)
      : isSameMonth(new Date(holiday.date), currentDate)
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'event': return <CalendarIcon className="w-4 h-4" />;
      case 'task': return <CheckSquare className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        {viewMode === 'day' ? "Today's" : "This Month's"} Events
      </h3>

      <div className="space-y-4">
        {filteredHolidays.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-red-600 dark:text-red-400">Holidays</h4>
            {filteredHolidays.map(holiday => (
              <div key={holiday.name} className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                <p className="text-sm text-red-700 dark:text-red-300">{holiday.name}</p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  {format(new Date(holiday.date), 'MMM d, yyyy')}
                </p>
              </div>
            ))}
          </div>
        )}

        {filteredEvents.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-blue-600 dark:text-blue-400">Events</h4>
            {filteredEvents.map(event => (
              <div key={event.id} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  {getEventIcon(event.type)}
                  <div className="flex-1">
                    <p className="text-sm text-blue-700 dark:text-blue-300">{event.title}</p>
                    {event.startTime && (
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {format(new Date(event.date), 'MMM d')} at {event.startTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-green-600 dark:text-green-400">Tasks</h4>
            {filteredTasks.map(task => (
              <div key={task.id} className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm text-green-700 dark:text-green-300">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Due {format(new Date(task.dueDate), 'MMM d')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredEvents.length === 0 && filteredTasks.length === 0 && filteredHolidays.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No events scheduled for this {viewMode}
          </p>
        )}
      </div>
    </div>
  );
};