import { TIME_CONSTANTS } from "../constants";

export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_HOUR);
  const mins = Math.floor((seconds % TIME_CONSTANTS.SECONDS_PER_HOUR) / TIME_CONSTANTS.SECONDS_PER_MINUTE);
  const secs = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;

  return `${hrs.toString().padStart(TIME_CONSTANTS.PADDING_LENGTH, '0')}:${mins.toString().padStart(TIME_CONSTANTS.PADDING_LENGTH, '0')}:${secs.toString().padStart(TIME_CONSTANTS.PADDING_LENGTH, '0')}`;
};

