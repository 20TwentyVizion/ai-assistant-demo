export const parseDateTime = (text: string): Date | null => {
  // Handle relative dates
  const tomorrow = /tomorrow at (\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
  const today = /today at (\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
  
  let match = text.match(tomorrow) || text.match(today);
  if (match) {
    const isToday = text.toLowerCase().includes('today');
    const date = new Date();
    if (!isToday) date.setDate(date.getDate() + 1);
    
    let hours = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const meridian = match[3]?.toLowerCase();
    
    if (meridian === 'pm' && hours < 12) hours += 12;
    if (meridian === 'am' && hours === 12) hours = 0;
    
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  
  // Try parsing explicit date strings
  const explicitDate = new Date(text);
  if (!isNaN(explicitDate.getTime())) {
    return explicitDate;
  }
  
  return null;
};