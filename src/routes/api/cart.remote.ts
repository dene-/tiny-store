import { command, query, getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
import { ENDPOINTS } from './config.const';
import z from 'zod';
import type { Cart } from '@/interfaces/store.interfaces';
import { buildEndpoint, createCartHeaders, parseCartResponse, rethrowHttpOrFail } from './remote-utils';

const getCartSchema = z.string().optional();
type GetCartParams = z.infer<typeof getCartSchema>;

type CartRequestOptions = {
  cartToken?: string;
  endpoint: string;
  method?: 'GET' | 'POST';
};

async function requestCart({ cartToken, endpoint, method = 'GET' }: CartRequestOptions) {
  const { fetch } = getRequestEvent();

  const response = await fetch(endpoint, {
    method,
    headers: createCartHeaders(cartToken),
  });

  const result = await parseCartResponse(response);

  return {
    ...result,
    cartToken: response.headers.get('Cart-Token'),
  };
}

function requireCart(cart: Cart | undefined, message: string): Cart {
  if (!cart) {
    error(502, message);
  }

  return cart;
}

export const getCart = query(getCartSchema, async (cartToken?: GetCartParams) => {
  try {
    const result = await requestCart({
      cartToken,
      endpoint: ENDPOINTS.CART,
    });

    return {
      cart: requireCart(result.cart, 'No cart response from server'),
      cartToken: result.cartToken,
    };
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch cart');
  }
});

export const addItemToCart = command(
  z.object({
    cartToken: z.string().min(1).optional(),
    id: z.number().min(1),
    quantity: z.number().min(1).max(999).optional().default(1),
  }),
  async ({ cartToken, id, quantity }) => {
    try {
      return await requestCart({
        cartToken,
        endpoint: buildEndpoint(`${ENDPOINTS.CART}/add-item`, { id, quantity }),
        method: 'POST',
      });
    } catch (err) {
      rethrowHttpOrFail(err, 'Unable to add item to cart');
    }
  },
);

export const updateCartItem = command(
  z.object({
    cartToken: z.string().min(1).optional(),
    key: z.string(),
    quantity: z.number().min(0).max(999).optional().default(1),
  }),
  async ({ cartToken, key, quantity }) => {
    try {
      return await requestCart({
        cartToken,
        endpoint: buildEndpoint(`${ENDPOINTS.CART}/update-item`, { key, quantity }),
        method: 'POST',
      });
    } catch (err) {
      rethrowHttpOrFail(err, 'Unable to update cart item');
    }
  },
);

export const removeCartItem = command(
  z.object({
    cartToken: z.string().min(1).optional(),
    key: z.string(),
  }),
  async ({ cartToken, key }) => {
    try {
      return await requestCart({
        cartToken,
        endpoint: buildEndpoint(`${ENDPOINTS.CART}/remove-item`, { key }),
        method: 'POST',
      });
    } catch (err) {
      rethrowHttpOrFail(err, 'Unable to remove cart item');
    }
  },
);
