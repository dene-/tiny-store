import { dev } from '$app/environment';

const baseURL = dev ? 'http://localhost:8585' : 'https://8585.terminaldogma.win';
const WP_API = '/wp-json/wc/store/v1/';

export const ENDPOINTS = {
  PRODUCTS: `${baseURL}${WP_API}products`,
  CART: `${baseURL}${WP_API}cart`,
};
