import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { ENDPOINTS } from './config.const';
import z from 'zod';
import type { Cart } from '@/interfaces/store.interfaces';

const getCartSchema = z.string().optional();
type getCartParams = z.infer<typeof getCartSchema>;

const parseCartResponse = async (response: Response) => {
  const responseJson = await response.json();

  if (responseJson.hasOwnProperty('items')) {
    return {
      cart: responseJson as Cart,
    };
  }

  if (responseJson.hasOwnProperty('message') && responseJson.hasOwnProperty('data')) {
    if (responseJson.data.hasOwnProperty('cart')) {
      return {
        message: responseJson.message,
        cart: responseJson.data.cart as Cart,
      };
    }

    return {
      message: responseJson.message,
    };
  }

  throw error(500, 'Invalid response from server');
};

export const getCart = query(getCartSchema, async (cartToken?: getCartParams) => {
  const headers = new Headers();

  if (cartToken) {
    headers.append('Cart-Token', cartToken);
  }

  try {
    const res = await fetch(ENDPOINTS.CART, {
      headers,
    });

    const cartToken = res.headers.get('Cart-Token');
    const nonce = res.headers.get('Nonce');

    const cart = await res.json();

    if (!cart) throw error(500, 'No response from server');

    return {
      cart,
      cartToken,
      nonce,
    };
  } catch (err) {
    console.error('Error fetching cart data:', err);
    throw error(500, 'Internal Server Error');
  }
});

export const addItemToCart = query(
  z.object({
    cartToken: z.string().min(1).optional(),
    id: z.number().min(1),
    quantity: z.number().min(1).max(999).optional().default(1),
  }),
  async ({ cartToken, id, quantity }) => {
    const headers = new Headers();

    if (cartToken) {
      headers.append('Cart-Token', cartToken);
    }

    try {
      const res = await fetch(`${ENDPOINTS.CART}/add-item?id=${id}&quantity=${quantity}`, {
        method: 'POST',
        headers,
      });

      return parseCartResponse(res);
    } catch (err) {
      console.error('Error adding item to cart:', err);
      throw error(500, 'Internal Server Error');
    }
  },
);

export const updateCartItem = query(
  z.object({
    cartToken: z.string().min(1).optional(),
    key: z.string(),
    quantity: z.number().min(0).max(999).optional().default(1),
  }),
  async ({ cartToken, key, quantity }) => {
    const headers = new Headers();

    if (cartToken) {
      headers.append('Cart-Token', cartToken);
    }

    try {
      const res = await fetch(`${ENDPOINTS.CART}/update-item?key=${key}&quantity=${quantity}`, {
        method: 'POST',
        headers,
      });

      return parseCartResponse(res);
    } catch (err) {
      console.error('Error updating item in cart:', err);
      throw error(500, 'Internal Server Error');
    }
  },
);

export const removeCartItem = query(
  z.object({
    cartToken: z.string().min(1).optional(),
    key: z.string(),
  }),
  async ({ cartToken, key }) => {
    const headers = new Headers();

    if (cartToken) {
      headers.append('Cart-Token', cartToken);
    }

    try {
      const res = await fetch(`${ENDPOINTS.CART}/remove-item?key=${key}`, {
        method: 'POST',
        headers,
      });

      return parseCartResponse(res);
    } catch (err) {
      console.error('Error removing item from cart:', err);
      throw error(500, 'Internal Server Error');
    }
  },
);
