import { useMemo, useCallback, useState, useEffect } from "react";
import { Button } from "../../../shared/ui/Button";
import { formatTime } from "../../../shared/utils/formatTime.ts";
import styles from "./StopWatchItem.module.scss";

interface StopWatchItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const StopWatchItem = ({ id, onDelete }: StopWatchItemProps) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const formattedTime = useMemo(() => formatTime(time), [time]);

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
    onDelete(id);
  }, [id, onDelete]);

  const isShowStart = !hasStarted;
  const isShowPauseAndClear = isRunning;
  const isShowResumeAndClear = hasStarted && !isRunning;

  return (
    <div className={styles.container}>
      <div className={styles.time}>{formattedTime}</div>

      <div className={styles.buttons}>
        {isShowStart && (
          <Button variant="start" onClick={handleStart}>
            Start
          </Button>
        )}

        {isShowPauseAndClear && (
          <>
            <Button variant="pause" onClick={handlePause}>
              Pause
            </Button>
            <Button variant="clear" onClick={handleClear}>
              Clear
            </Button>
          </>
        )}

        {isShowResumeAndClear && (
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

export default StopWatchItem;