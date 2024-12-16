import React, { useState, useCallback } from 'react';
import { Send } from 'lucide-react';
import { VoiceToggle } from './VoiceToggle';
import { speechService } from '../services/speech';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const toggleVoice = useCallback(async () => {
    if (isRecording) {
      try {
        const text = await speechService.stopRecording();
        setMessage(text);
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    } else if (isVoiceEnabled) {
      try {
        await speechService.startRecording();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
    setIsVoiceEnabled(!isVoiceEnabled);
  }, [isVoiceEnabled, isRecording]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-200">
      <VoiceToggle
        isVoiceEnabled={isVoiceEnabled}
        onToggle={toggleVoice}
        isRecording={isRecording}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isRecording ? 'Recording...' : 'Type your message...'}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isRecording}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isRecording}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};