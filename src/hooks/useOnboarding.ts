import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'onboarding-completed';

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOnboardingComplete(true);
  };

  return {
    isOnboardingComplete,
    completeOnboarding,
  };
};