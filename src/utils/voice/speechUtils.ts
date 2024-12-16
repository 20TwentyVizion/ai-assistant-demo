export const detectSpeechEnd = (
  audioLevel: number,
  threshold: number = 0.1,
  duration: number = 1500
): Promise<void> => {
  return new Promise((resolve) => {
    let silentTime = 0;
    const checkInterval = 100; // Check every 100ms
    
    const intervalId = setInterval(() => {
      if (audioLevel < threshold) {
        silentTime += checkInterval;
        if (silentTime >= duration) {
          clearInterval(intervalId);
          resolve();
        }
      } else {
        silentTime = 0;
      }
    }, checkInterval);
  });
};

export const removeSilence = (audioData: Float32Array, threshold: number = 0.01): Float32Array => {
  const start = audioData.findIndex(sample => Math.abs(sample) > threshold);
  const end = audioData.length - [...audioData].reverse().findIndex(sample => Math.abs(sample) > threshold);
  
  return audioData.slice(start, end);
};

export const normalizeAudio = (audioData: Float32Array): Float32Array => {
  const maxAmplitude = Math.max(...audioData.map(Math.abs));
  return maxAmplitude === 0 
    ? audioData 
    : audioData.map(sample => sample / maxAmplitude);
};