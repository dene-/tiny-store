import { describe, expect, it } from 'vitest';

import { addItemToCart, removeCartItem, updateCartItem } from './cart.remote';
import { checkoutOrder, getCheckoutStatus, getPaymentGateways } from './checkout.remote';
import { toPublicPaymentGateways } from './payment-gateways';

type RemoteWithMetadata = {
  __?: {
    type?: string;
  };
};

const remoteType = (remote: unknown) => (remote as RemoteWithMetadata).__?.type;

describe('remote API method semantics', () => {
  it.each([
    ['addItemToCart', addItemToCart],
    ['updateCartItem', updateCartItem],
    ['removeCartItem', removeCartItem],
    ['checkoutOrder', checkoutOrder],
  ])('%s uses command semantics for server-side mutations', (_name, remote) => {
    expect(remoteType(remote)).toBe('command');
  });

  it.each([
    ['getCheckoutStatus', getCheckoutStatus],
    ['getPaymentGateways', getPaymentGateways],
  ])('%s remains a query for read-only data', (_name, remote) => {
    expect(remoteType(remote)).toBe('query');
  });
});

describe('payment gateway projection', () => {
  it('returns only checkout-safe fields for enabled payment gateways', () => {
    const gateways = toPublicPaymentGateways([
      {
        id: 'cod',
        title: 'Cash on delivery',
        description: 'Pay when the order arrives',
        enabled: true,
        settings: { title: { value: 'internal title' } },
        settings_url: 'https://admin.example.test/settings',
        connection_url: 'https://admin.example.test/connect',
        required_settings_keys: ['secret'],
      },
      {
        id: 'disabled',
        title: 'Disabled',
        description: 'Hidden',
        enabled: false,
        settings: { title: { value: 'hidden' } },
      },
    ]);

    expect(gateways).toEqual([
      {
        id: 'cod',
        title: 'Cash on delivery',
        description: 'Pay when the order arrives',
      },
    ]);

    expect(gateways[0]).not.toHaveProperty('settings');
    expect(gateways[0]).not.toHaveProperty('settings_url');
    expect(gateways[0]).not.toHaveProperty('connection_url');
    expect(gateways[0]).not.toHaveProperty('required_settings_keys');
  });
});
