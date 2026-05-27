import { describe, expect, it } from 'vitest';

import { toShippingAddressPreference } from './shipping-address.mapper';

describe('shipping address mapper', () => {
  it('maps generic form data to a shipping address preference', () => {
    expect(
      toShippingAddressPreference({
        'full-name': 'Ada Lovelace',
        'phone-number': '+34000000000',
        'address-1': 'Main St',
        'address-2': 'Floor 2',
        city: 'Madrid',
        'postal-code': '28001',
        state: 'Madrid',
        country: 'ES',
      }),
    ).toEqual({
      fullName: 'Ada Lovelace',
      phoneNumber: '+34000000000',
      address1: 'Main St',
      address2: 'Floor 2',
      city: 'Madrid',
      postalCode: '28001',
      state: 'Madrid',
      country: 'ES',
    });
  });
});
