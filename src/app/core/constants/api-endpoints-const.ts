import { L } from '@angular/cdk/keycodes';

export const API_ENDPOINTS = {
  AUTH: {
    USERS: '/users',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: number) => `/products/${id}`,
  },
};
