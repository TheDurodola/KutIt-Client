import { ENV } from "../config/env";

/**
 * Custom error class for API failures
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Single Responsibility: Base HTTP client for sending requests and parsing responses.
 */
export async function request(endpoint, options = {}) {
  const url = `${ENV.BACKEND_URL}${endpoint}`;

  const headers = {
    ...options.headers,
  };

  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }

  const config = {
    credentials: "include",
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : {};
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "GATEWAY_TIMEOUT: Unable to connect to server. Check connection.",
      0,
      null
    );
  }
}

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: "PUT", body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),
};
