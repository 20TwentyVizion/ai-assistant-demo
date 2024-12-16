import { SpeechRecognitionResult } from '../../types/voice/recognition';
import { createSpeechError } from './errorHandler';

class SpeechRecognition {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw createSpeechError('UNSUPPORTED', 'Speech recognition is not supported in this browser');
    }
    
    this.recognition = new SpeechRecognition();
    this.configureRecognition();
  }

  private configureRecognition(): void {
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
  }

  async recognize(audioBlob: Blob): Promise<SpeechRecognitionResult> {
    if (this.isListening) {
      throw createSpeechError('ALREADY_LISTENING', 'Speech recognition is already in progress');
    }

    return new Promise((resolve, reject) => {
      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const result: SpeechRecognitionResult = {
          transcript: event.results[0][0].transcript,
          confidence: event.results[0][0].confidence
        };
        this.isListening = false;
        resolve(result);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(createSpeechError('RECOGNITION_ERROR', `Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      // Convert blob to audio element and play it for recognition
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.onended = () => this.recognition.stop();
      audio.play();
      this.recognition.start();
    });
  }

  stop(): void {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechRecognition = new SpeechRecognition();