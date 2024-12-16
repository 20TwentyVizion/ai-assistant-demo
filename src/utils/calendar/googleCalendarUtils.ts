import { CalendarEvent } from '../../types/calendar';

export const mapToGoogleEvent = (event: CalendarEvent) => {
  return {
    summary: event.title,
    description: event.description,
    start: {
      dateTime: event.startTime 
        ? `${event.date.toISOString().split('T')[0]}T${event.startTime}:00`
        : event.date.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: event.endTime 
        ? `${event.date.toISOString().split('T')[0]}T${event.endTime}:00`
        : new Date(event.date.getTime() + 3600000).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    location: event.location,
    attendees: event.attendees?.map(email => ({ email })),
    recurrence: event.recurrence ? [
      `RRULE:FREQ=${event.recurrence.frequency.toUpperCase()};INTERVAL=${event.recurrence.interval}${
        event.recurrence.endDate ? `;UNTIL=${event.recurrence.endDate.toISOString().split('T')[0]}` : ''
      }${event.recurrence.occurrences ? `;COUNT=${event.recurrence.occurrences}` : ''}`
    ] : undefined,
  };
};

export const mapFromGoogleEvent = (googleEvent: any): Partial<CalendarEvent> => {
  return {
    title: googleEvent.summary,
    description: googleEvent.description,
    date: new Date(googleEvent.start.dateTime || googleEvent.start.date),
    startTime: googleEvent.start.dateTime 
      ? new Date(googleEvent.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : undefined,
    endTime: googleEvent.end.dateTime
      ? new Date(googleEvent.end.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : undefined,
    location: googleEvent.location,
    attendees: googleEvent.attendees?.map((attendee: any) => attendee.email),
    isGoogleEvent: true,
    googleEventId: googleEvent.id,
  };
};