import { memo } from "react";
import type { StopWatchButtonProps } from "../types/types.ts";

const StopWatchButton = ({ type, onClick, children }: StopWatchButtonProps) => {
  const buttonClassName = `stopwatch__button stopwatch__button--${type}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(StopWatchButton);
