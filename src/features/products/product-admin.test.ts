import { describe, expect, it } from 'vitest';

import { formatProductPrice } from './product-admin';

describe('product admin helpers', () => {
  it('formats WooCommerce minor-unit price strings as euros', () => {
    expect(formatProductPrice('1299')).toBe('12.99');
    expect(formatProductPrice(undefined)).toBe('0.00');
  });
});
