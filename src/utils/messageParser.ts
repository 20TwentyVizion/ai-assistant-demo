import { parseDateTime } from './dateParser';

export interface ParsedCommand {
  type: 'schedule' | 'task' | 'unknown';
  data?: {
    title?: string;
    dateTime?: Date;
    duration?: number;
  };
}

export const parseCommand = (message: string): ParsedCommand => {
  // Check for scheduling commands
  const scheduleRegex = /schedule (?:a )?(?:meeting|call|event)(?: about| for)? (.*?)(?:\s+(?:for|on|at)\s+(.+?))?(?:\s+for\s+(\d+)\s*(?:min(?:ute)?s?)?)?$/i;
  const scheduleMatch = message.match(scheduleRegex);
  
  if (scheduleMatch) {
    const title = scheduleMatch[1]?.trim();
    const dateTimeStr = scheduleMatch[2]?.trim();
    const duration = scheduleMatch[3] ? parseInt(scheduleMatch[3]) : 30;
    
    const dateTime = dateTimeStr ? parseDateTime(dateTimeStr) : null;
    
    if (title && dateTime) {
      return {
        type: 'schedule',
        data: {
          title,
          dateTime,
          duration,
        },
      };
    }
  }
  
  // Check for task commands (reusing existing taskParser logic)
  const taskRegex = /add (?:a )?task(?: to)? (.*?)(?: by (.+))?$/i;
  const taskMatch = message.match(taskRegex);
  
  if (taskMatch) {
    return {
      type: 'task',
      data: {
        title: taskMatch[1].trim(),
        dateTime: taskMatch[2] ? parseDateTime(taskMatch[2]) : undefined,
      },
    };
  }
  
  return { type: 'unknown' };
};