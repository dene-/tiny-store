import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import z from 'zod';

import { ENDPOINTS } from './config.const';

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
