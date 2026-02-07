import { memo } from "react";
import type { StopWatchButtonProps } from "../types/types.ts";
import styles from "./StopWatchButton.module.scss";

const StopWatchButton = ({ type, onClick, children }: StopWatchButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[type]}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(StopWatchButton);
