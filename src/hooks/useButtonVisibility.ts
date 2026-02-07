import { useMemo } from "react";
import type { StopWatch } from "../types/types";

export const useButtonVisibility = (stopwatch: StopWatch) => {
  return useMemo(
    () => ({
      showStart: !stopwatch.isRunning && stopwatch.time === 0,
      showPauseAndClear: stopwatch.isRunning,
      showResumeAndClear: !stopwatch.isRunning && stopwatch.time > 0,
      showDelete: true,
    }),
    [stopwatch.isRunning, stopwatch.time]
  );
};
