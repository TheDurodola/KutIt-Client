import { apiClient } from "./apiClient";

/**
 * Single Responsibility: URL shortening and management API actions.
 */
export const urlService = {
  shortenPublic: async (originalLink) => {
    return apiClient.post("/api/v1/entry", { originalLink });
  },

  getUserEntries: async () => {
    return apiClient.get("/user/entries");
  },

  createUserEntry: async (originalLink) => {
    return apiClient.post("/user/entry", { originalLink });
  },

  deleteUserEntry: async (id) => {
    return apiClient.delete(`/user/entry/${id}`);
  },

  resolveShortCode: async (shortCode) => {
    return apiClient.get(`/api/v1/${shortCode}`);
  },
};
