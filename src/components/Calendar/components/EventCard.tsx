import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckSquare, Bell } from 'lucide-react';
import { EventType } from '../../../types/calendar';

interface EventCardProps {
  title: string;
  date: Date;
  type: EventType;
  startTime?: string;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  type,
  startTime,
  className = '',
}) => {
  const getEventIcon = () => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'task': return <CheckSquare className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColors = () => {
    switch (type) {
      case 'event': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'task': return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'reminder': return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`p-2 rounded-md ${getEventColors()} ${className}`}>
      <div className="flex items-center gap-2">
        {getEventIcon()}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs opacity-75">
            {format(date, 'MMM d')}
            {startTime && ` at ${startTime}`}
          </p>
        </div>
      </div>
    </div>
  );
};