export const parseTaskCommand = (message: string): { title: string; dueDate: Date | undefined } | null => {
  const taskRegex = /add (?:a )?task(?: to)? (.*?)(?: by (.+))?$/i;
  const match = message.match(taskRegex);

  if (!match) return null;

  const title = match[1].trim();
  const dateStr = match[2]?.trim();
  
  let dueDate: Date | undefined;
  if (dateStr) {
    try {
      dueDate = new Date(dateStr);
      if (isNaN(dueDate.getTime())) dueDate = undefined;
    } catch {
      dueDate = undefined;
    }
  }

  return { title, dueDate };
};