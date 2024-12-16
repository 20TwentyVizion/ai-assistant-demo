export type ViewMode = 'day' | 'month';
export type EventType = 'event' | 'task' | 'reminder';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  date: Date;
  startTime?: string;
  endTime?: string;
  isGoogleEvent?: boolean;
  googleEventId?: string;
  color?: string;
  location?: string;
  attendees?: string[];
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    occurrences?: number;
  };
}

export interface GoogleCalendarConfig {
  isConnected: boolean;
  lastSync?: Date;
  syncEnabled?: boolean;
  defaultCalendarId?: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  googleConfig: GoogleCalendarConfig;
  selectedDate: Date | null;
  viewMode: ViewMode;
};