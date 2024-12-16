export const getCurrentTime = (): Date => {
  return new Date();
};

export const isNightTime = (): boolean => {
  const hour = getCurrentTime().getHours();
  return hour < 6 || hour >= 18; // Night time between 6 PM and 6 AM
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};