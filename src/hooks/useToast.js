import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Single Responsibility: Toast notification state, visibility, and auto-dismiss timing.
 */
export function useToast(defaultDuration = 5000) {
  const [toast, setToast] = useState({
    message: "",
    type: "error", // 'error' | 'success' | 'info'
    isVisible: false,
  });

  const timerRef = useRef(null);

  const showToast = useCallback((message, type = "error", duration = defaultDuration) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({
      message,
      type,
      isVisible: true,
    });

    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, duration);
  }, [defaultDuration]);

  const hideToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
