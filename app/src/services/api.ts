import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://api.foodie.app/api/v1';

const API_TIMEOUT = 30000; // 30 seconds

// Storage keys
const ACCESS_TOKEN_KEY = '@foodie_access_token';
const REFRESH_TOKEN_KEY = '@foodie_refresh_token';

// Types
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

interface RequestConfig extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
  params?: Record<string, string | number | boolean | undefined>;
}

// Token management
export async function getAccessToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setAccessToken(token: string): Promise<void> {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setRefreshToken(token: string): Promise<void> {
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export async function clearTokens(): Promise<void> {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}

export async function setTokens(accessToken: string, refreshToken: string): Promise<void> {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
  ]);
}

// Token refresh logic
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string): void {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refreshToken}),
    });

    const data: ApiResponse<{accessToken: string; refreshToken: string}> = await response.json();

    if (data.success && data.data) {
      await setTokens(data.data.accessToken, data.data.refreshToken);
      return data.data.accessToken;
    }

    // Refresh failed, clear tokens
    await clearTokens();
    return null;
  } catch {
    await clearTokens();
    return null;
  }
}

// Create fetch with timeout
function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timeout'));
    }, timeout);

    fetch(url, {...options, signal: controller.signal})
      .then(response => {
        clearTimeout(id);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(id);
        reject(error);
      });
  });
}

/**
 * Main API client function
 */
export async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<ApiResponse<T>> {
  const {timeout = API_TIMEOUT, skipAuth = false, params, ...fetchConfig} = config;

  // Build URL with query params if provided
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge custom headers
  if (fetchConfig.headers) {
    Object.assign(headers, fetchConfig.headers);
  }

  // Add auth token if not skipped
  if (!skipAuth) {
    const token = await getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    let response = await fetchWithTimeout(url, {...fetchConfig, headers}, timeout);

    // Handle 401 - try to refresh token
    if (response.status === 401 && !skipAuth) {
      if (!isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;

        if (newToken) {
          onTokenRefreshed(newToken);
          // Retry original request with new token
          headers.Authorization = `Bearer ${newToken}`;
          response = await fetchWithTimeout(url, {...fetchConfig, headers}, timeout);
        } else {
          return {
            success: false,
            error: {
              message: 'Session expired. Please login again.',
              code: 'SESSION_EXPIRED',
            },
          };
        }
      } else {
        // Wait for token refresh
        return new Promise(resolve => {
          subscribeTokenRefresh(async token => {
            headers.Authorization = `Bearer ${token}`;
            const retryResponse = await fetchWithTimeout(url, {...fetchConfig, headers}, timeout);
            resolve(await retryResponse.json());
          });
        });
      }
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: {
        message,
        code: 'NETWORK_ERROR',
      },
    };
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {...config, method: 'GET'}),

  post: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {...config, method: 'DELETE'}),
};

export default api;
