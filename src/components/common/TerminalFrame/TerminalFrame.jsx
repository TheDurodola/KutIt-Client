import React from "react";
import styles from "./TerminalFrame.module.css";

/**
 * Single Responsibility: Presentational retro terminal container with header bar and dots.
 */
export default function TerminalFrame({
  title = "TERMINAL_WINDOW",
  className = "",
  headerAction = null,
  children,
}) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <span className={styles.title}>{title}</span>
        {headerAction && <div className={styles.action}>{headerAction}</div>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
