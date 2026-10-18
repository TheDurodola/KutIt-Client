import React from "react";
import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

/**
 * Single Responsibility: Presentational retro 8-bit button with variants, sizes, and navigation support.
 */
export default function Button({
  buttonTitle,
  children,
  link,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  icon = null,
  ...restProps
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) {
      onClick(e);
    } else if (link) {
      navigate(link);
    }
  };

  const variantClass = styles[variant] || styles.primary;
  const sizeClass = styles[size] || styles.md;

  return (
    <button
      type={type}
      className={`${styles.retroBtn} ${variantClass} ${sizeClass} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...restProps}
    >
      {icon && <span className={styles.btnIcon}>{icon}</span>}
      <span className={styles.label}>{children || buttonTitle}</span>
    </button>
  );
}
