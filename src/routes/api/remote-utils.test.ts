import { describe, expect, it } from 'vitest';

import { buildEndpoint, createCartHeaders, parseCartResponse } from './remote-utils';

describe('remote API utilities', () => {
  it('creates cart headers only when a token is present', () => {
    expect(createCartHeaders().has('Cart-Token')).toBe(false);
    expect(createCartHeaders('cart-token').get('Cart-Token')).toBe('cart-token');
  });

  it('encodes endpoint query parameters', () => {
    expect(buildEndpoint('https://store.test/cart/update-item', { key: 'abc/123', quantity: 2 })).toBe(
      'https://store.test/cart/update-item?key=abc%2F123&quantity=2',
    );
  });

  it('parses WooCommerce cart payloads nested under data.cart', async () => {
    const cart = { items: [] };
    const response = new Response(
      JSON.stringify({
        message: 'updated',
        data: { cart },
      }),
    );

    await expect(parseCartResponse(response)).resolves.toEqual({
      message: 'updated',
      cart,
    });
  });

  it('parses direct WooCommerce cart payloads', async () => {
    const cart = { items: [] };
    const response = new Response(JSON.stringify(cart));

    await expect(parseCartResponse(response)).resolves.toEqual({
      cart,
    });
  });

  it('rejects failed cart responses before trusting the body', async () => {
    const response = new Response(JSON.stringify({ items: [] }), { status: 500 });

    await expect(parseCartResponse(response)).rejects.toThrow('Cart request failed with status 500');
  });

  it('rejects invalid cart payloads instead of returning an empty cart', async () => {
    const response = new Response(JSON.stringify({ unexpected: true }));

    await expect(parseCartResponse(response)).rejects.toThrow('Invalid cart response from server');
  });
});
