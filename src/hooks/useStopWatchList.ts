import { useEffect, useRef, useState, useCallback } from 'react';
import type { StopWatch } from '../types/types';

export const useStopWatchList = () => {
  const [stopwatches, setStopwatches] = useState<StopWatch[]>([]);
  const intervalRef = useRef<{ [key: string]: ReturnType<typeof setInterval> }>({});

  const addStopWatch = useCallback(() => {
    const newStopWatch: StopWatch = {
      id: Date.now().toString(),
      time: 0,
      isRunning: false
    };
    setStopwatches(prev => [...prev, newStopWatch]);
  }, []);

  const startStopWatch = useCallback((id: string) => {
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, isRunning: true } : sw));
    intervalRef.current[id] = setInterval(() => {
      setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, time: sw.time + 1 } : sw));
    }, 1000);
  }, []);

  const pauseStopWatch = useCallback((id: string) => {
    clearInterval(intervalRef.current[id]);
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, isRunning: false } : sw));
  }, []);

  const resumeStopWatch = useCallback((id: string) => {
    startStopWatch(id);
  }, [startStopWatch]);

  const clearStopWatch = useCallback((id: string) => {
    clearInterval(intervalRef.current[id]);
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, time: 0, isRunning: false } : sw));
  }, []);

  const deleteStopWatch = useCallback((id: string) => {
    clearInterval(intervalRef.current[id]);
    setStopwatches(prev => prev.filter(sw => sw.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      Object.values(intervalRef.current).forEach(clearInterval);
    };
  }, []);

  return {
    stopwatches,
    addStopWatch,
    startStopWatch,
    pauseStopWatch,
    resumeStopWatch,
    clearStopWatch,
    deleteStopWatch
  };
};
