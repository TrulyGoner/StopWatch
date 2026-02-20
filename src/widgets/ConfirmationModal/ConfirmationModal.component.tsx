import { memo, useEffect, useCallback } from "react";
import type { ConfirmationModalProps } from "./ConfirmationModal.types";
import styles from "./ConfirmationModal.module.scss";

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Подтверждение",
  message = "Ты уверен, что хочешь создать таймер?",
  confirmText = "Да",
  cancelText = "Нет",
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleDocClick = useCallback(() => {
    console.log('click');
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.getElementsByTagName('html')[0].addEventListener('click', handleDocClick);

    return () => {
    document.getElementsByTagName('html')[0].removeEventListener('click', handleDocClick);
    };

  }, [isOpen, handleDocClick]);

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
            className={`${styles.button} ${styles.confirmButton}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
          <button
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
