import { AudioConfig } from '../../types/voice/audio';
import { createSpeechError } from './errorHandler';

class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  async startRecording(config: AudioConfig = {}): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          ...config
        }
      });

      // Set up audio analysis
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      source.connect(this.analyser);
      
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      throw createSpeechError('RECORDING_START_ERROR', 'Failed to start recording', error);
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(createSpeechError('NO_RECORDER', 'No active recording'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.cleanup();
          resolve(audioBlob);
        } catch (error) {
          reject(createSpeechError('RECORDING_STOP_ERROR', 'Failed to stop recording', error));
        }
      };

      this.mediaRecorder.stop();
    });
  }

  getAudioLevel(): number {
    if (!this.analyser || !this.dataArray) return 0;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    const average = this.dataArray.reduce((acc, value) => acc + value, 0) / this.dataArray.length;
    return average / 255; // Normalize to 0-1
  }

  private cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
    this.dataArray = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
  }
}

export const audioRecorder = new AudioRecorder();