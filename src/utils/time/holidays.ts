interface Holiday {
  name: string;
  date: Date;
  type: 'federal' | 'cultural' | 'international';
}

const holidays: Holiday[] = [
  {
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    type: 'federal'
  },
  {
    name: 'Christmas',
    date: new Date(new Date().getFullYear(), 11, 25),
    type: 'federal'
  },
  // Add more holidays as needed
];

export const getTodayHoliday = (): Holiday | null => {
  const today = new Date();
  return holidays.find(holiday => 
    holiday.date.getMonth() === today.getMonth() &&
    holiday.date.getDate() === today.getDate()
  ) || null;
};

export const getUpcomingHolidays = (limit: number = 3): Holiday[] => {
  const today = new Date();
  return holidays
    .filter(holiday => holiday.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, limit);
};