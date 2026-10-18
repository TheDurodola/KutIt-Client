import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Single Responsibility: Clipboard operations with timed feedback state.
 */
export function useClipboard(feedbackDuration = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setCopied(false);
        }, feedbackDuration);

        return true;
      } catch {
        return false;
      }
    },
    [feedbackDuration]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { copied, copy };
}
