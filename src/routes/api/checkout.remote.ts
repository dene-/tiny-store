import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import z, { check } from 'zod';

import { ENDPOINTS } from './config.const';

import { env } from '$env/dynamic/private';

import type { CheckoutStatus, PaymentGatewaysResponse, CheckoutOrderResponse } from '@/interfaces/store.interfaces';

const oauth = new OAuth({
  consumer: { key: env.WC_READ_CONSUMER_KEY, secret: env.WC_READ_CONSUMER_SECRET },
  signature_method: 'HMAC-SHA256',
  hash_function(baseString, key) {
    return crypto.createHmac('sha256', key).update(baseString).digest('base64');
  },
});

export const getCheckoutStatus = query(z.string().optional(), async (cartToken?: string) => {
  const headers = new Headers();

  if (cartToken) {
    headers.append('Cart-Token', cartToken);
  }

  try {
    const res = await fetch(`${ENDPOINTS.CHECKOUT}`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      console.error('Error fetching checkout status:', res.statusText);
      throw new Error('Failed to fetch checkout status');
    }

    const data = (await res.json()) as CheckoutStatus;

    return data;
  } catch (err) {
    console.error(err);

    throw error(500, 'Error fetching products');
  }
});

export const getPaymentGateways = query(async () => {
  try {
    // Generate OAuth params
    const oauthParams = oauth.authorize({
      url: ENDPOINTS.PAYMENT_GATEWAYS,
      method: 'GET',
    });

    // Create the Authorization header
    const authHeader = oauth.toHeader(oauthParams);

    const res = await fetch(`${ENDPOINTS.PAYMENT_GATEWAYS}`, {
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Error fetching payment methods:', res.statusText);
      throw new Error('Failed to fetch payment methods');
    }

    let data = (await res.json()) as PaymentGatewaysResponse;

    data = data.filter(gateway => gateway.enabled);

    return data;
  } catch (err) {
    console.error(err);

    throw error(500, 'Error fetching payment methods');
  }
});

const CheckoutSchema = z.object({
  billing_address: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    company: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address_1: z.string().optional(),
    address_2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
  }),
  shipping_address: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      company: z.string().optional(),
      address_1: z.string().optional(),
      address_2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postcode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  payment_method: z.string(),
  customer_note: z.string().optional().default(''),
  create_account: z.boolean().optional(),
  cart_token: z.string(),
  nonce: z.string(),
  payment_data: z.array(z.any()).optional().default([]),
  customer_password: z.string().optional().default(''),
});

type checkoutParams = z.infer<typeof CheckoutSchema>;

export const checkoutOrder = query(CheckoutSchema, async (checkoutData: checkoutParams) => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (checkoutData.cart_token && checkoutData.nonce) {
      headers.append('Cart-Token', checkoutData.cart_token);
      headers.append('Nonce', checkoutData.nonce);
    }

    const response = await fetch(`${ENDPOINTS.CHECKOUT}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      console.error('Error during checkout:', response.statusText);
      throw new Error('Checkout failed');
    }

    const data = (await response.json()) as CheckoutOrderResponse;
    return data;
  } catch (err) {
    throw error(500, 'Error during checkout');
  }
});
