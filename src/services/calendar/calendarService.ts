import { API_CONFIG } from '../../config/api';
import { CalendarEvent } from './types';

class CalendarService {
  private static instance: CalendarService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize calendar service using browser-compatible approach
      const response = await fetch('https://apis.google.com/js/api.js');
      if (!response.ok) throw new Error('Failed to load Google API');
      
      await new Promise<void>((resolve) => {
        window.gapi.load('client:auth2', async () => {
          try {
            await window.gapi.client.init({
              apiKey: API_CONFIG.GOOGLE_CALENDAR.API_KEY,
              clientId: API_CONFIG.GOOGLE_CALENDAR.CLIENT_ID,
              scope: API_CONFIG.GOOGLE_CALENDAR.SCOPES.join(' '),
            });
            this.isInitialized = true;
            resolve();
          } catch (error) {
            console.error('Error initializing Google Calendar:', error);
            throw error;
          }
        });
      });
    } catch (error) {
      console.error('Error loading Google API:', error);
      throw error;
    }
  }

  async createEvent(event: CalendarEvent): Promise<string> {
    try {
      await this.init();
      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      return response.result.htmlLink || '';
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }
}

export const calendarService = CalendarService.getInstance();