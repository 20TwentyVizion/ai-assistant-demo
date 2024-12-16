import { VoiceState, VoiceEventHandler } from './types';
import { createVoiceError } from './errorHandler';

class VoiceStateManager {
  private static instance: VoiceStateManager;
  private state: VoiceState = {
    isRecording: false,
    mediaRecorder: null,
    stream: null,
  };
  private onStateChange: VoiceEventHandler | null = null;

  private constructor() {}

  static getInstance(): VoiceStateManager {
    if (!VoiceStateManager.instance) {
      VoiceStateManager.instance = new VoiceStateManager();
    }
    return VoiceStateManager.instance;
  }

  setStateChangeHandler(handler: VoiceEventHandler) {
    this.onStateChange = handler;
  }

  setState(updates: Partial<VoiceState>) {
    this.state = { ...this.state, ...updates };
    this.onStateChange?.(null);
  }

  setMediaRecorder(recorder: MediaRecorder, stream: MediaStream) {
    if (this.state.isRecording) {
      const error = createVoiceError('RECORDING_IN_PROGRESS', 'Recording is already in progress');
      this.onStateChange?.(error);
      throw error;
    }

    this.setState({
      mediaRecorder: recorder,
      stream,
      isRecording: true,
    });
  }

  clearRecording() {
    if (this.state.stream) {
      this.state.stream.getTracks().forEach(track => track.stop());
    }
    
    this.setState({
      mediaRecorder: null,
      stream: null,
      isRecording: false,
    });
  }

  getState(): VoiceState {
    return { ...this.state };
  }
}

export const voiceStateManager = VoiceStateManager.getInstance();