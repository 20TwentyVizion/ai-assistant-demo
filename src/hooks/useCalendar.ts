import { useState, useEffect } from 'react';
import { CalendarEvent, GoogleCalendarConfig } from '../types/calendar';
import { calendarService } from '../services/calendar/calendarService';
import { Task } from '../types';
import { loadEvents, saveEvents } from '../utils/localStorage';
import { Holiday } from '../types/time';
import { timeService } from '../services/timeService';

export const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => loadEvents());
  const [googleConfig, setGoogleConfig] = useState<GoogleCalendarConfig>({
    isConnected: false
  });
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const timeInfo = timeService.getCurrentTimeInfo();
      setHolidays([
        ...(timeInfo.holiday ? [timeInfo.holiday] : []),
        ...timeInfo.upcomingHolidays
      ]);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString()
    };

    if (googleConfig.isConnected) {
      try {
        const googleEventId = await calendarService.createEvent({
          summary: event.title,
          description: event.description,
          start: {
            dateTime: new Date(event.date).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          end: {
            dateTime: new Date(event.date).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        });
        
        newEvent.isGoogleEvent = true;
        newEvent.googleEventId = googleEventId;
      } catch (error) {
        console.error('Failed to sync with Google Calendar:', error);
      }
    }

    setEvents(prev => [...prev, newEvent]);
  };

  const syncWithGoogle = async () => {
    try {
      await calendarService.init();
      setGoogleConfig({ isConnected: true, lastSync: new Date() });
    } catch (error) {
      console.error('Failed to sync with Google Calendar:', error);
      throw error;
    }
  };

  return {
    events,
    tasks,
    holidays,
    googleConfig,
    addEvent,
    syncWithGoogle
  };
};