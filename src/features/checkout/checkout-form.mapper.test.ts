import { describe, expect, it } from 'vitest';

import { toBillingAddress } from './checkout-form.mapper';

describe('checkout form mapper', () => {
  it('maps generic form data to a checkout billing address', () => {
    expect(
      toBillingAddress({
        first_name: 'Ada',
        last_name: 'Lovelace',
        address_1: 'Main St',
        country: 'ES',
        city: 'Madrid',
        state: 'Madrid',
        postcode: '28001',
        email: 'ada@example.test',
        phone: '+34000000000',
      }),
    ).toEqual({
      first_name: 'Ada',
      last_name: 'Lovelace',
      address_1: 'Main St',
      address_2: '',
      country: 'ES',
      city: 'Madrid',
      state: 'Madrid',
      postcode: '28001',
      email: 'ada@example.test',
      phone: '+34000000000',
    });
  });
});
