export interface TimeInfo {
  time: string;
  date: string;
  isNight: boolean;
  holiday: Holiday | null;
  upcomingHolidays: Holiday[];
  timezone: string;
}

export interface Holiday {
  name: string;
  date: Date;
  type: 'federal' | 'cultural' | 'international';
}