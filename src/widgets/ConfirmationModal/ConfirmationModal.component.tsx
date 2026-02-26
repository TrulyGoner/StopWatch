import { memo, useEffect, useRef } from "react";
import type { ConfirmationModalProps } from "./ConfirmationModal.types";
import styles from "./ConfirmationModal.module.scss";

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Подтверждение",
  message = "Ты уверен?",
  confirmText = "Да",
  cancelText = "Нет",
}: ConfirmationModalProps) => {
  const confirmBtnRef  = useRef<HTMLButtonElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const active = document.activeElement;
        if (active === confirmBtnRef.current) {
          cancelBtnRef.current?.focus();
        } else {
          confirmBtnRef.current?.focus();
        }
      }
    };

    document.getElementsByTagName("html")[0].addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.getElementsByTagName("html")[0].removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button
            ref={confirmBtnRef}
            className={`${styles.button} ${styles.confirmButton}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
          <button
            ref={cancelBtnRef}
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmationModal);
