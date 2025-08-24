export const API_ENDPOINTS = {
  AUTH: {
    USERS: '/users',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    DETAILS: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },
  CARTS: {
    LIST: '/carts',
    CREATE: '/carts',
    DETAILS: (id: number | string) => `/carts/${id}`,
    UPDATE: (id: number | string) => `/carts/${id}`,
    DELETE: (id: number | string) => `/carts/${id}`,
  },
};
