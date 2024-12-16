import { VoiceSettings, defaultVoiceSettings } from './voice/settings';

export type PersonalityType = 'friendly' | 'professional' | 'humorous';
export type ToneType = 'formal' | 'casual' | 'motivational';
export type ThemeType = 'light' | 'dark' | 'holiday';

export interface UserProfile {
  name: string;
  birthday?: Date;
  interests: string[];
  botName: string;
  timezone?: string;
}

export interface ThemeSettings {
  theme: ThemeType;
  autoTheme: boolean;
  holidayMode: boolean;
}

export interface ChatbotSettings {
  personality: PersonalityType;
  useEmojis: boolean;
  tone: ToneType;
  voice: VoiceSettings;
  theme: ThemeSettings;
  profile: UserProfile;
}

export const defaultSettings: ChatbotSettings = {
  personality: 'friendly',
  useEmojis: true,
  tone: 'casual',
  voice: defaultVoiceSettings,
  theme: {
    theme: 'light',
    autoTheme: false,
    holidayMode: false
  },
  profile: {
    name: '',
    interests: [],
    botName: 'AI Assistant',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  },
};