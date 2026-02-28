import { STORAGE_KEY } from '../constants';

interface StoredStopWatch {
  id: string;
  time: number;
  isRunning: boolean;
  hasStarted: boolean;
  lastSavedAt?: number;
}

export const loadStopWatches = (): StoredStopWatch[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading stopwatches from localStorage:', error);
    return [];
  }
};

export const saveStopWatch = (stopwatch: StoredStopWatch): void => {
  try {
    const stopwatches = loadStopWatches();
    
    const index = stopwatches.findIndex(sw => sw.id === stopwatch.id);
    if (index !== -1) {
      stopwatches[index] = stopwatch;
    } else {
      stopwatches.push(stopwatch);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stopwatches));
  } catch (error) {
    console.error('Error saving stopwatch to localStorage:', error);
  }
};

export const deleteStopWatch = (id: string): void => {
  try {
    const stopwatches = loadStopWatches();
    const filtered = stopwatches.filter(sw => sw.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting stopwatch from localStorage:', error);
  }
};

export const calculateTimeDiff = (lastSavedAt: number | undefined): number => {
  if (!lastSavedAt) return 0;
  const now = Date.now();
  const diffMs = now - lastSavedAt;
  return Math.floor(diffMs / 1000);
};
