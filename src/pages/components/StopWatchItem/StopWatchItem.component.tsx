import { useMemo, useCallback, useState, useEffect, memo } from "react";
import { Button } from "../../../shared/ui/Button";
import { formatTime } from "../../../shared/utils/formatTime.ts";
import { saveStopWatch, deleteStopWatch, calculateTimeDiff, loadStopWatches } from "../../../shared/utils/localStorage";
import styles from "./StopWatchItem.module.scss";

interface StopWatchItemProps {
  id: string;
  setStopwatchIds: (updater: (prev: string[]) => string[]) => void;
}

const StopWatchItem = ({ id, setStopwatchIds }: StopWatchItemProps) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const formattedTime = useMemo(() => formatTime(time), [time]);

  useEffect(() => {
    const saved = loadStopWatches();
    const stopwatch = saved.find(sw => sw.id === id);
    
    if (stopwatch) {
      let restoredTime = stopwatch.time;

      if (stopwatch.isRunning && stopwatch.lastSavedAt) {
        const timeDiff = calculateTimeDiff(stopwatch.lastSavedAt);
        restoredTime += timeDiff;
      }
      
      setTime(restoredTime);
      setIsRunning(stopwatch.isRunning);
      setHasStarted(stopwatch.hasStarted);
    }
    
    setInitialized(true);
  }, [id]);

  useEffect(() => {
    if (!initialized) return;

    saveStopWatch({
      id,
      time,
      isRunning,
      hasStarted,
      lastSavedAt: isRunning ? Date.now() : undefined,
    });
  }, [id, time, isRunning, hasStarted, initialized]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = useCallback((): void => {
    setIsRunning(true);
    setHasStarted(true);
  }, []);

  const handlePause = useCallback((): void => {
    setIsRunning(false);
  }, []);

  const handleResume = useCallback((): void => {
    setIsRunning(true);
  }, []);

  const handleClear = useCallback((): void => {
    setTime(0);
    setIsRunning(false);
    setHasStarted(false);
  }, []);

  const handleDelete = useCallback((): void => {
    deleteStopWatch(id);
    setStopwatchIds(prev => prev.filter(swId => swId !== id));
  }, [id, setStopwatchIds]);

  return (
    <div className={styles.container}>
      <div className={styles.time}>{formattedTime}</div>

      <div className={styles.buttons}>
        {!hasStarted && (
          <Button variant="start" onClick={handleStart}>
            Start
          </Button>
        )}

        {isRunning && (
          <>
            <Button variant="pause" onClick={handlePause}>
              Pause
            </Button>
            <Button variant="clear" onClick={handleClear}>
              Clear
            </Button>
          </>
        )}

        {hasStarted && !isRunning && (
          <>
            <Button variant="resume" onClick={handleResume}>
              Resume
            </Button>
            <Button variant="clear" onClick={handleClear}>
              Clear
            </Button>
          </>
        )}

        <Button variant="delete" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default memo(StopWatchItem);