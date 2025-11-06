import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import z from 'zod';

import { ENDPOINTS } from './config.const';

import { env } from '$env/dynamic/private';

import type { PaymentGatewaysResponse } from '@/interfaces/store.interfaces';

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

    const data = await res.json();
    console.log('Checkout status data:', data);
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
