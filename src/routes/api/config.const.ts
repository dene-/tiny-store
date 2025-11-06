import { dev } from '$app/environment';

const baseURL = dev ? 'http://localhost:8585' : 'https://8585.terminaldogma.win';
const WP_API = '/wp-json/wc/store/v1/';
const WP_API_V3 = '/wp-json/wc/v3/';

export const ENDPOINTS = {
  PRODUCTS: `${baseURL}${WP_API}products`,
  CART: `${baseURL}${WP_API}cart`,
  CHECKOUT: `${baseURL}${WP_API}checkout`,
  CATEGORIES: `${baseURL}${WP_API}products/categories`,
  PAYMENT_GATEWAYS: `${baseURL}${WP_API_V3}payment_gateways`,
};
