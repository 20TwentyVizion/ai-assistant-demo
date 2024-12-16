import { CalendarEvent, EventType } from '../../types/calendar';

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    // Sort by date first
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    
    // If same date, sort by time
    if (a.startTime && b.startTime) {
      return a.startTime.localeCompare(b.startTime);
    }
    
    // Events with time come before events without time
    if (a.startTime) return -1;
    if (b.startTime) return 1;
    
    return 0;
  });
};

export const getEventTypeColor = (type: EventType): string => {
  switch (type) {
    case 'event': return 'blue';
    case 'task': return 'green';
    case 'reminder': return 'purple';
    default: return 'gray';
  }
};

export const createEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};