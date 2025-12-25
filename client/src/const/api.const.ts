export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
} as const;

// 2. Use 'satisfies' to enforce the structure without losing literal types
export const API_ROUTES = {
  LOGIN: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/login`,
    method: "POST",
  },
  REGISTER: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/register`,
    method: "POST",
  },
  VERIFY_TFA: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/verify-2fa`,
    method: "POST",
  },
  ACTIVATE_TFA: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/activate-2fa`,
    method: "POST",
  },
  USER: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/me`,
    method: "POST",
  },
  LOGOUT: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/logout`,
    method: "POST",
  },
} as const satisfies Record<string, { url: string; method: string }>;
