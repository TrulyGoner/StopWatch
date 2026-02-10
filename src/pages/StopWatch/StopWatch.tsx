import { useState, useCallback, useEffect } from "react";
import { StopWatchItem } from "../components/StopWatchItem/index.ts";
import type { StopWatchType } from "./StopWatch.types";
import styles from './StopWatch.module.scss'

const intervalIds: { [key: string]: ReturnType<typeof setInterval> } = {};

const StopWatch = () => {
  const [stopwatches, setStopwatches] = useState<StopWatchType[]>([]);

  const addStopWatch = useCallback(() => {
    const newStopWatch: StopWatchType = {
      id: Date.now().toString(),
      time: 0,
      isRunning: false,
      hasStarted: false,
    };
    setStopwatches(prev => [...prev, newStopWatch]);
  }, []);

  const startStopWatch = useCallback((id: string) => {
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, isRunning: true, hasStarted: true } : sw));
    intervalIds[id] = setInterval(() => {
      setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, time: sw.time + 1 } : sw));
    }, 1000);
  }, []);

  const pauseStopWatch = useCallback((id: string) => {
    clearInterval(intervalIds[id]);
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, isRunning: false } : sw));
  }, []);

  const resumeStopWatch = useCallback((id: string) => {
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, isRunning: true } : sw));
    intervalIds[id] = setInterval(() => {
      setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, time: sw.time + 1 } : sw));
    }, 1000);
  }, []);

  const clearStopWatch = useCallback((id: string) => {
    clearInterval(intervalIds[id]);
    setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, time: 0, isRunning: false, hasStarted: false } : sw));
  }, []);

  const deleteStopWatch = useCallback((id: string) => {
    clearInterval(intervalIds[id]);
    delete intervalIds[id];
    setStopwatches(prev => prev.filter(sw => sw.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, []);
  
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Stopwatch App</h1>
      <button onClick={addStopWatch} className={styles.addButton}>Add Stopwatch</button>
      <div className={styles.list}>
        {stopwatches.map(sw => (
          <StopWatchItem
            key={sw.id}
            stopwatch={sw}
            onStart={startStopWatch}
            onPause={pauseStopWatch}
            onResume={resumeStopWatch}
            onClear={clearStopWatch}
            onDelete={deleteStopWatch}
          />  
        ))}
      </div>
    </div>
  );
}

export default StopWatch;
