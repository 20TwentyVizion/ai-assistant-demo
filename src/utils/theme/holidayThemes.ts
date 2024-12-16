import { Holiday } from '../../types/time';

interface HolidayTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  animations?: string[];
  backgroundPattern?: string;
  icons?: Record<string, string>;
}

export const holidayThemes: Record<string, HolidayTheme> = {
  christmas: {
    colors: {
      primary: 'bg-red-600',
      secondary: 'bg-green-600',
      accent: 'bg-yellow-400',
      background: 'bg-[url("/patterns/snow.svg")]',
      text: 'text-gray-800 dark:text-gray-100'
    },
    animations: ['animate-snowfall'],
    backgroundPattern: '/patterns/snow.svg',
    icons: {
      calendar: '🎄',
      task: '🎁',
      settings: '⛄️'
    }
  },
  halloween: {
    colors: {
      primary: 'bg-orange-500',
      secondary: 'bg-purple-600',
      accent: 'bg-green-500',
      background: 'bg-[url("/patterns/spooky.svg")]',
      text: 'text-gray-800 dark:text-gray-100'
    },
    animations: ['animate-spooky'],
    backgroundPattern: '/patterns/spooky.svg',
    icons: {
      calendar: '🎃',
      task: '👻',
      settings: '🦇'
    }
  },
  valentines: {
    colors: {
      primary: 'bg-pink-500',
      secondary: 'bg-red-400',
      accent: 'bg-purple-400',
      background: 'bg-[url("/patterns/hearts.svg")]',
      text: 'text-gray-800 dark:text-gray-100'
    },
    animations: ['animate-float'],
    backgroundPattern: '/patterns/hearts.svg',
    icons: {
      calendar: '💝',
      task: '💌',
      settings: '💘'
    }
  }
};