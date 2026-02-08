import { useMemo } from "react";
import type { StopWatchProps } from "../types/types.ts";
import { Button } from "../shared/ui/Button";
import { formatTime } from "../shared/utils/formatTime.ts";
import { useStopWatchCallbacks } from "../hooks/useStopWatchCallbacks.ts";
import { useButtonVisibility } from "../hooks/useButtonVisibility.ts";
import styles from "./StopWatchItem.module.scss";

const StopWatchItem =  (props: StopWatchProps) => {
  const formattedTime = useMemo(() => formatTime(props.stopwatch.time), [props.stopwatch.time]);
  const { handleStart, handlePause, handleResume, handleClear, handleDelete } = useStopWatchCallbacks(props);
  const { showStart, showPauseAndClear, showResumeAndClear } = useButtonVisibility(props.stopwatch);

  return (
    <div className={styles.container}>
      <div className={styles.time}>{formattedTime}</div>

      <div className={styles.buttons}>
        {showStart && (
          <Button variant="start" onClick={handleStart}>
            Start
          </Button>
        )}

        {showPauseAndClear && (
          <>
            <Button variant="pause" onClick={handlePause}>
              Pause
            </Button>
            <Button variant="clear" onClick={handleClear}>
              Clear
            </Button>
          </>
        )}

        {showResumeAndClear && (
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