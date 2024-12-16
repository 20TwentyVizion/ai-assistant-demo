import { useState, useEffect } from 'react';
import { Message } from '../types';
import { messageStorage } from '../services/storage/messageStorage';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>(() => messageStorage.loadMessages());

  useEffect(() => {
    messageStorage.saveMessages(messages);
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    addMessage,
    clearMessages
  };
};