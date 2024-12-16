import { voiceStateManager } from './voiceState';
import { AudioData, VoiceEventHandler } from './types';
import { createVoiceError, handleVoiceError } from './errorHandler';

class AudioRecorder {
  private audioChunks: Blob[] = [];
  private onError: VoiceEventHandler | null = null;

  setErrorHandler(handler: VoiceEventHandler) {
    this.onError = handler;
  }

  async startRecording(): Promise<void> {
    try {
      const state = voiceStateManager.getState();
      if (state.isRecording) {
        throw createVoiceError('RECORDING_IN_PROGRESS', 'Recording is already in progress');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      mediaRecorder.onerror = (event) => {
        const error = handleVoiceError(event.error);
        this.onError?.(error);
        this.cleanup();
      };

      voiceStateManager.setMediaRecorder(mediaRecorder, stream);
      mediaRecorder.start(100); // Collect data every 100ms for smoother processing
    } catch (error) {
      const voiceError = handleVoiceError(error);
      this.onError?.(voiceError);
      this.cleanup();
      throw voiceError;
    }
  }

  async stopRecording(): Promise<AudioData> {
    return new Promise((resolve, reject) => {
      const state = voiceStateManager.getState();
      if (!state.mediaRecorder) {
        const error = createVoiceError('NO_RECORDER', 'No active recording');
        this.onError?.(error);
        reject(error);
        return;
      }

      state.mediaRecorder.onstop = () => {
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          resolve({ blob: audioBlob, chunks: [...this.audioChunks] });
          this.cleanup();
        } catch (error) {
          const voiceError = handleVoiceError(error);
          this.onError?.(voiceError);
          reject(voiceError);
          this.cleanup();
        }
      };

      state.mediaRecorder.stop();
    });
  }

  private cleanup() {
    voiceStateManager.clearRecording();
    this.audioChunks = [];
  }

  cancelRecording() {
    this.cleanup();
  }
}

export const audioRecorder = new AudioRecorder();