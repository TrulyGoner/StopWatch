import { useMemo } from "react";
import type { StopWatchProps } from "../types/types.ts";
import StopWatchButton from "./StopWatchButton.tsx";
import { formatTime } from "../shared/utils/formatTime.ts";
import { useStopWatchCallbacks } from "../hooks/useStopWatchCallbacks.ts";
import { useButtonVisibility } from "../hooks/useButtonVisibility.ts";
import "./StopWatch.css";

const StopWatchItem =  (props: StopWatchProps) => {
  const formattedTime = useMemo(() => formatTime(props.stopwatch.time), [props.stopwatch.time]);
  const { handleStart, handlePause, handleResume, handleClear, handleDelete } = useStopWatchCallbacks(props);
  const { showStart, showPauseAndClear, showResumeAndClear } = useButtonVisibility(props.stopwatch);

  return (
    <div className="stopwatch">
      <div className="stopwatch__time">{formattedTime}</div>

      <div className="stopwatch__buttons">
        {showStart && (
          <StopWatchButton type="start" onClick={handleStart}>
            Start
          </StopWatchButton>
        )}

        {showPauseAndClear && (
          <>
            <StopWatchButton type="pause" onClick={handlePause}>
              Pause
            </StopWatchButton>
            <StopWatchButton type="clear" onClick={handleClear}>
              Clear
            </StopWatchButton>
          </>
        )}

        {showResumeAndClear && (
          <>
            <StopWatchButton type="resume" onClick={handleResume}>
              Resume
            </StopWatchButton>
            <StopWatchButton type="clear" onClick={handleClear}>
              Clear
            </StopWatchButton>
          </>
        )}

        <StopWatchButton type="delete" onClick={handleDelete}>
          Delete
        </StopWatchButton>
      </div>
    </div>
  );
};

export default StopWatchItem;