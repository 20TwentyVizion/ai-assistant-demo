import { VoiceSettings } from '../../types/voice/settings';
import { SpeechRecognitionResult } from '../../types/voice/recognition';
import { audioRecorder } from './audioRecorder';
import { speechRecognition } from './speechRecognition';
import { speechSynthesis } from './speechSynthesis';
import { createSpeechError } from './errorHandler';
import { detectSpeechEnd } from '../../utils/voice/speechUtils';

class SpeechService {
  private static instance: SpeechService;
  private currentVoiceConfig: VoiceSettings;
  public onSpeechEnd: (() => void) | null = null;

  private constructor() {
    this.currentVoiceConfig = {
      enabled: false,
      type: 'neutral',
      pitch: 1,
      rate: 1
    };
  }

  static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  setVoiceConfig(config: VoiceSettings): void {
    this.currentVoiceConfig = config;
  }

  async startRecording(): Promise<void> {
    try {
      await audioRecorder.startRecording();
      
      // Monitor audio levels for speech end detection
      const checkAudioLevel = async () => {
        const level = audioRecorder.getAudioLevel();
        await detectSpeechEnd(level);
        this.onSpeechEnd?.();
      };

      checkAudioLevel();
    } catch (error) {
      throw createSpeechError('RECORDING_ERROR', 'Failed to start recording', error);
    }
  }

  async stopRecording(): Promise<SpeechRecognitionResult> {
    try {
      const audioBlob = await audioRecorder.stopRecording();
      return await speechRecognition.recognize(audioBlob);
    } catch (error) {
      throw createSpeechError('RECORDING_STOP_ERROR', 'Failed to stop recording', error);
    }
  }

  async synthesizeSpeech(text: string): Promise<void> {
    if (!this.currentVoiceConfig.enabled) return;

    try {
      await speechSynthesis.speak(text, this.currentVoiceConfig);
    } catch (error) {
      throw createSpeechError('SYNTHESIS_ERROR', 'Failed to synthesize speech', error);
    }
  }

  stopAll(): void {
    try {
      speechRecognition.stop();
      speechSynthesis.stop();
    } catch (error) {
      console.error('Error stopping speech services:', error);
    }
  }
}

export const speechService = SpeechService.getInstance();