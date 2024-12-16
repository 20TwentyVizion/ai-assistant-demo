import { useState, useCallback, useEffect } from 'react';
import { audioRecorder } from '../services/voice/audioRecorder';
import { speechRecognition } from '../services/speech/speechRecognition';
import { VoiceError } from '../services/voice/types';
import { voiceStateManager } from '../services/voice/voiceState';

export const useVoiceMode = (onMessage: (text: string) => void) => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<VoiceError | null>(null);

  const handleError = useCallback((error: VoiceError | null) => {
    setError(error);
    if (error) {
      setIsListening(false);
      setIsActive(false);
    }
  }, []);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setIsListening(true);
      await audioRecorder.startRecording();
    } catch (error) {
      if (error instanceof Error) {
        handleError({ code: 'RECORDER_ERROR', message: error.message, details: error });
      }
    }
  }, [handleError]);

  const stopListening = useCallback(async () => {
    try {
      const audioData = await audioRecorder.stopRecording();
      const result = await speechRecognition.recognize(audioData.blob);
      if (result.transcript) {
        onMessage(result.transcript);
      }
    } catch (error) {
      if (error instanceof Error) {
        handleError({ code: 'RECORDER_ERROR', message: error.message, details: error });
      }
    } finally {
      setIsListening(false);
    }
  }, [onMessage, handleError]);

  useEffect(() => {
    audioRecorder.setErrorHandler(handleError);
    voiceStateManager.setStateChangeHandler(handleError);

    return () => {
      audioRecorder.setErrorHandler(null);
      voiceStateManager.setStateChangeHandler(null);
    };
  }, [handleError]);

  useEffect(() => {
    if (!isActive) {
      if (isListening) {
        audioRecorder.cancelRecording();
        setIsListening(false);
      }
      return;
    }

    let timeoutId: NodeJS.Timeout;
    if (isActive && !isListening) {
      startListening();
    }

    return () => {
      clearTimeout(timeoutId);
      if (isListening) {
        audioRecorder.cancelRecording();
      }
    };
  }, [isActive, isListening, startListening]);

  const toggleVoiceMode = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  return {
    isActive,
    isListening,
    error,
    toggleVoiceMode
  };
};