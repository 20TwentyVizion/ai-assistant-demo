import { Message } from '../../types';

const MESSAGES_KEY = 'ai-assistant-messages';
const MAX_MESSAGES = 100; // Limit stored messages to prevent excessive storage use

export const messageStorage = {
  saveMessages: (messages: Message[]) => {
    try {
      // Keep only the last MAX_MESSAGES
      const messagesToStore = messages.slice(-MAX_MESSAGES);
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messagesToStore));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },

  loadMessages: (): Message[] => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  }
};