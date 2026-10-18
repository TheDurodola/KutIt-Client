import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { X } from "lucide-react";

/**
 * Single Responsibility: Presentational modal overlay with terminal styling and ESC key handling.
 */
export default function Modal({ title = "SYSTEM_INSPECTOR", onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerBar}>
          <div className={styles.headerTitle} id="modal-title">
            <span className={styles.bracket}>[</span>
            <span className={styles.titleText}>{title}</span>
            <span className={styles.bracket}>]</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
