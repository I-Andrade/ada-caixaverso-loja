export const API_ENDPOINTS = {
  AUTH: {
    USERS: '/users',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAILS: (id: string) => `/products/${id}`,
  },
};
