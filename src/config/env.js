/**
 * Single Responsibility: Environment configuration and URL resolution.
 */

export const ENV = {
  BACKEND_URL: import.meta.env.VITE_BASE_URL_FOR_BACKEND || "",
  FRONTEND_URL:
    import.meta.env.VITE_BASE_URL_FOR_FRONTEND ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/`
      : "http://localhost:5173/"),
};

export const getFullShortUrl = (shortenedLink) => {
  const base = ENV.FRONTEND_URL.replace(/\/$/, "");
  return `${base}/${shortenedLink || ""}`;
};
