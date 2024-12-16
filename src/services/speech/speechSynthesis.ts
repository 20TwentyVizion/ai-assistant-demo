import { VoiceSettings } from '../../types/voice/settings';
import { createSpeechError } from './errorHandler';
import { voicePresets } from '../../types/voice/synthesis';

class SpeechSynthesis {
  private synthesis: SpeechSynthesis;
  private currentVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
  }

  private async loadVoices(): Promise<void> {
    if (this.synthesis.getVoices().length > 0) {
      return;
    }

    return new Promise((resolve) => {
      this.synthesis.onvoiceschanged = () => {
        resolve();
      };
    });
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    await this.loadVoices();
    
    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        const preset = voicePresets[settings.type];

        utterance.pitch = settings.pitch;
        utterance.rate = settings.rate;

        const voices = this.synthesis.getVoices();
        const voice = voices.find((v) => v.name === preset.voiceName) || voices[0];
        if (voice) utterance.voice = voice;

        utterance.onend = () => resolve();
        utterance.onerror = (event) => {
          reject(createSpeechError('SYNTHESIS_ERROR', 'Speech synthesis failed', event));
        };

        this.synthesis.speak(utterance);
      } catch (error) {
        reject(createSpeechError('SYNTHESIS_ERROR', 'Failed to synthesize speech', error));
      }
    });
  }

  stop(): void {
    this.synthesis.cancel();
  }
}

export const speechSynthesis = new SpeechSynthesis();