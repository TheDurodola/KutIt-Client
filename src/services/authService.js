import { apiClient } from "./apiClient";

/**
 * Single Responsibility: Authentication API actions.
 */
export const authService = {
  login: async (credentials) => {
    return apiClient.post("/auth/login", credentials);
  },

  register: async (userData) => {
    return apiClient.post("/auth/register", userData);
  },

  logout: async () => {
    return apiClient.post("/auth/logout");
  },
};
