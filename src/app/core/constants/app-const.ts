import { B } from '@angular/cdk/keycodes';
import { LOCALE_ID } from '@angular/core';

export const LOCALE_PROVIDER = {
  provide: LOCALE_ID,
  useValue: 'pt-BR',
};

export const TITLE = 'Loja CaixaVerso';
export const SUBTITLE = 'A melhor loja galáctica.';

export const PATHS = {
  BASE: '/',
  THIS: '',
  HOME: 'home',
  AUTH: 'autenticacao',
  LOGIN: 'entrar',
  REGISTER: 'registrar',
  PRODUCTS: 'produtos',
  LIST: 'lista',
  DETAILS: 'detalhes',
  DETAILS_ID: 'detalhes/:id',
  CART: 'carrinho',
  NOT_FOUND: '404',
};
