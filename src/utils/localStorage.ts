import { Task } from '../types';
import { CalendarEvent } from '../types/calendar';

const TASKS_KEY = 'chatbot-tasks';
const EVENTS_KEY = 'calendar-events';

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
  const saved = localStorage.getItem(TASKS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveEvents = (events: CalendarEvent[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const loadEvents = (): CalendarEvent[] => {
  const saved = localStorage.getItem(EVENTS_KEY);
  return saved ? JSON.parse(saved) : [];
};