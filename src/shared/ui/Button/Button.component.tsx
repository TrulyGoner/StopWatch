import { memo } from "react";
import type { ButtonProps } from "./Button.types.ts";
import styles from "./Button.module.scss";

const Button = ({ variant, onClick, children }: ButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[variant]}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(Button);
