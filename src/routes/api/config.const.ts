import { env } from '$env/dynamic/private';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const baseURL = 'https://8585.terminaldogma.win';
const WP_API = '/wp-json/wc/store/v1/';
const WP_API_V3 = '/wp-json/wc/v3/';

export const ENDPOINTS = {
  PRODUCTS: `${baseURL}${WP_API}products`,
  PRODUCTSV3: `${baseURL}${WP_API_V3}products`,
  CART: `${baseURL}${WP_API}cart`,
  CHECKOUT: `${baseURL}${WP_API}checkout`,
  CATEGORIES: `${baseURL}${WP_API}products/categories`,
  PAYMENT_GATEWAYS: `${baseURL}${WP_API_V3}payment_gateways`,
  ORDERS: `${baseURL}${WP_API}order`,
};

export const oauth = new OAuth({
  consumer: { key: env.WC_READ_CONSUMER_KEY, secret: env.WC_READ_CONSUMER_SECRET },
  signature_method: 'HMAC-SHA256',
  hash_function(baseString, key) {
    return crypto.createHmac('sha256', key).update(baseString).digest('base64');
  },
});
