import { query, getRequestEvent } from '$app/server';
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

  console.error('Invalid response from server');
  return {
    cart: {} as Cart,
  };
};

export const getCart = query(getCartSchema, async (cartToken?: getCartParams) => {
  const { fetch, cookies } = getRequestEvent();

  const headers = new Headers();

  if (cartToken) {
    headers.append('Cart-Token', cartToken);
  }

  try {
    const res = await fetch(ENDPOINTS.CART, {
      headers,
    });

    const cartToken = res.headers.get('Cart-Token');

    cookies.set('cart_token', cartToken || '', { path: '/' });

    const cart = await res.json();

    if (!cart) {
      console.error('No response from server');
      return {
        cart: {} as Cart,
        cartToken: null,
      };
    }

    return {
      cart,
      cartToken,
    };
  } catch (err) {
    console.error('Error fetching cart data:', err);
    return {
      cart: {} as Cart,
      cartToken: null,
    };
  }
});

export const addItemToCart = query(
  z.object({
    cartToken: z.string().min(1).optional(),
    id: z.number().min(1),
    quantity: z.number().min(1).max(999).optional().default(1),
  }),
  async ({ cartToken, id, quantity }) => {
    const { fetch } = getRequestEvent();

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
      return {
        cart: {} as Cart,
      };
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
    const { fetch } = getRequestEvent();

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
      return {
        cart: {} as Cart,
      };
    }
  },
);

export const removeCartItem = query(
  z.object({
    cartToken: z.string().min(1).optional(),
    key: z.string(),
  }),
  async ({ cartToken, key }) => {
    const { fetch } = getRequestEvent();

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
      return {
        cart: {} as Cart,
      };
    }
  },
);
