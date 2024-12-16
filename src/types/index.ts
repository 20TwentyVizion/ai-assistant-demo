export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface ChatState {
  messages: Message[];
  tasks: Task[];
  preferences: UserPreferences;
}