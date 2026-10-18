import { useState, useCallback, useEffect } from "react";
import { urlService } from "../services/urlService";
import { ApiError } from "../services/apiClient";

/**
 * Single Responsibility: Manages user links collection, loading states, and mutations.
 */
export function useUserUrls({ onUnauthorized, onError }) {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUrls = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await urlService.getUserEntries();
      setLinks(data.response?.entries || []);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        onUnauthorized?.();
      } else {
        onError?.(err.message || "Failed to load links from vault");
      }
    } finally {
      setIsLoading(false);
    }
  }, [onUnauthorized, onError]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const createUrl = useCallback(
    async (originalLink) => {
      try {
        setIsSubmitting(true);
        const data = await urlService.createUserEntry(originalLink);
        await fetchUrls();
        return data.response?.shortenedLink;
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          onUnauthorized?.();
        } else {
          onError?.(err.message || "Failed to create shortcode route");
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchUrls, onUnauthorized, onError]
  );

  const deleteUrl = useCallback(
    async (id) => {
      try {
        await urlService.deleteUserEntry(id);
        setLinks((prev) => prev.filter((link) => link.id !== id));
      } catch (err) {
        onError?.(err.message || "Failed to delete route from matrix");
        throw err;
      }
    },
    [onError]
  );

  return {
    links,
    isLoading,
    isSubmitting,
    fetchUrls,
    createUrl,
    deleteUrl,
  };
}
