import { getTodayHoliday, getUpcomingHolidays } from '../utils/time/holidays';
import { formatTime, formatDate } from '../utils/time/dateTime';

class TimeService {
  private static instance: TimeService;

  private constructor() {}

  static getInstance(): TimeService {
    if (!TimeService.instance) {
      TimeService.instance = new TimeService();
    }
    return TimeService.instance;
  }

  getCurrentTimeInfo() {
    const now = new Date();
    return {
      time: formatTime(now),
      date: formatDate(now),
      isNight: now.getHours() < 6 || now.getHours() >= 18,
      holiday: getTodayHoliday(),
      upcomingHolidays: getUpcomingHolidays(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}

export const timeService = TimeService.getInstance();