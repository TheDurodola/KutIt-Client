import React from "react";
import styles from "./Toast.module.css";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

/**
 * Single Responsibility: Presentational Toast notification banner.
 */
export default function Toast({ message, type = "error", isVisible = false, onClose }) {
  if (!message) return null;

  const icons = {
    error: <AlertCircle size={16} className={styles.icon} />,
    success: <CheckCircle2 size={16} className={styles.icon} />,
    info: <Info size={16} className={styles.icon} />,
  };

  const typeClass = styles[type] || styles.error;

  return (
    <div
      className={`${styles.toast} ${typeClass} ${isVisible ? styles.show : ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        {icons[type] || icons.error}
        <span className={styles.message}>{message}</span>
      </div>
      {onClose && (
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Dismiss notification"
          type="button"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
