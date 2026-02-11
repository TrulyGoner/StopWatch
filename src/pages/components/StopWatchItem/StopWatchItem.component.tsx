import { useMemo, useCallback } from "react";
import type { StopWatchProps } from "../../StopWatch/StopWatch.types";
import { Button } from "../../../shared/ui/Button";
import { formatTime } from "../../../shared/utils/formatTime.ts";
import styles from "./StopWatchItem.module.scss";

const StopWatchItem = ({
  stopwatch,
  onStart,
  onPause,
  onResume,
  onClear,
  onDelete,
}: StopWatchProps) => {
  const formattedTime = useMemo(() => formatTime(stopwatch.time), [stopwatch.time]);

  const handleStart = useCallback(():void => onStart(stopwatch.id), [stopwatch.id, onStart]);
  const handlePause = useCallback(():void => onPause(stopwatch.id), [stopwatch.id, onPause]);
  const handleResume = useCallback(():void => onResume(stopwatch.id), [stopwatch.id, onResume]);
  const handleClear = useCallback(():void => onClear(stopwatch.id), [stopwatch.id, onClear]);
  const handleDelete = useCallback(():void => onDelete(stopwatch.id), [stopwatch.id, onDelete]);

  const isShowStart = !stopwatch.hasStarted;
  const isShowPauseAndClear = stopwatch.isRunning;
  const isShowResumeAndClear = stopwatch.hasStarted && !stopwatch.isRunning;

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