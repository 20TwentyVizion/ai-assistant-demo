import { gapi } from 'gapi-script';
import { API_CONFIG } from '../config/api';

export interface CalendarEvent {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

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

    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: API_CONFIG.GOOGLE_CALENDAR.API_KEY,
            clientId: API_CONFIG.GOOGLE_CALENDAR.CLIENT_ID,
            scope: API_CONFIG.GOOGLE_CALENDAR.SCOPES.join(' '),
          });
          this.isInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async createEvent(event: CalendarEvent): Promise<string> {
    try {
      await this.init();
      const response = await gapi.client.calendar.events.insert({
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