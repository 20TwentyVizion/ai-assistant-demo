import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  startOfMonth, 
  endOfMonth,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  addDays,
  subDays,
  format,
} from 'date-fns';

export const getCalendarDays = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  
  return eachDayOfInterval({ start, end });
};

export const getEventsForDate = <T extends { date: Date }>(
  events: T[],
  date: Date
): T[] => {
  return events.filter(event => isSameDay(new Date(event.date), date));
};

export const getEventsForMonth = <T extends { date: Date }>(
  events: T[],
  date: Date
): T[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  return events.filter(event => 
    isWithinInterval(new Date(event.date), { start: monthStart, end: monthEnd })
  );
};

export const formatEventTime = (date: Date, time?: string): string => {
  if (!time) return format(date, 'MMM d, yyyy');
  return `${format(date, 'MMM d, yyyy')} at ${time}`;
};