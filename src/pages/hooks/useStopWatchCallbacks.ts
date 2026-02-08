import { useCallback, useMemo } from "react";
import type { StopWatchProps } from "../StopWatch/StopWatch.types";
//В item
export const useStopWatchCallbacks = ({
  stopwatch,
  onStart,
  onPause,
  onResume,
  onClear,
  onDelete,
}: StopWatchProps) => {
  const handleStart = useCallback(() => onStart(stopwatch.id), [stopwatch.id, onStart]);
  const handlePause = useCallback(() => onPause(stopwatch.id), [stopwatch.id, onPause]);
  const handleResume = useCallback(() => onResume(stopwatch.id), [stopwatch.id, onResume]);
  const handleClear = useCallback(() => onClear(stopwatch.id), [stopwatch.id, onClear]);
  const handleDelete = useCallback(() => onDelete(stopwatch.id), [stopwatch.id, onDelete]);

  return useMemo(
    () => ({
      handleStart,
      handlePause,
      handleResume,
      handleClear,
      handleDelete,
    }),
    [handleStart, handlePause, handleResume, handleClear, handleDelete]
  );
};
