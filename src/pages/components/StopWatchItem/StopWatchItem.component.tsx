import { useMemo, useCallback, useReducer, useEffect, memo } from "react";
import { Button } from "../../../shared/ui/Button";
import { formatTime } from "../../../shared/utils/formatTime.ts";
import { saveStopWatch, deleteStopWatch, calculateTimeDiff, loadStopWatches } from "../../../shared/utils/localStorage";
import styles from "./StopWatchItem.module.scss";

interface StopWatchItemProps {
  id: string;
  setStopwatchIds: (updater: (prev: string[]) => string[]) => void;
}

interface State {
  time: number;
  isRunning: boolean;
  hasStarted: boolean;
  initialized: boolean;
}

type Action =
  | { type: 'INITIALIZE'; saved: { time: number; isRunning: boolean; hasStarted: boolean } | null }
  | { type: 'TICK' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'CLEAR' };

const initialState: State = {
  time: 0,
  isRunning: false,
  hasStarted: false,
  initialized: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INITIALIZE':
      if (action.saved === null) return { ...state, initialized: true };
      return { ...state, ...action.saved, initialized: true };
    case 'TICK':
      return { ...state, time: state.time + 1 };
    case 'START':
      return { ...state, isRunning: true, hasStarted: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'RESUME':
      return { ...state, isRunning: true };
    case 'CLEAR':
      return { ...state, time: 0, isRunning: false, hasStarted: false };
    default:
      return state;
  }
}

const StopWatchItem = ({ id, setStopwatchIds }: StopWatchItemProps) => {
  const [{ time, isRunning, hasStarted, initialized }, dispatch] = useReducer(reducer, initialState);

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

      dispatch({ type: 'INITIALIZE', saved: { time: restoredTime, isRunning: stopwatch.isRunning, hasStarted: stopwatch.hasStarted } });
    } else {
      dispatch({ type: 'INITIALIZE', saved: null });
    }
  }, [id]);

  useEffect(() => {
    if (!initialized) return;

    const timeoutId = setTimeout(() => {
      saveStopWatch({
        id,
        time,
        isRunning,
        hasStarted,
        lastSavedAt: Date.now() 
      });
    }, 900);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, time, isRunning, hasStarted]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = useCallback((): void => {
    dispatch({ type: 'START' });
  }, []);

  const handlePause = useCallback((): void => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const handleResume = useCallback((): void => {
    dispatch({ type: 'RESUME' });
  }, []);

  const handleClear = useCallback((): void => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const handleDelete = useCallback((): void => {
    deleteStopWatch(id);
    setStopwatchIds(prev => prev.filter(swId => swId !== id));
  }, [id, setStopwatchIds]);

  return (
    <div className={styles.container} tabIndex={-1} data-stopwatch>
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
