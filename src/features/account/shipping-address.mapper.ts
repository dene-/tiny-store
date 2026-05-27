import type { FormDataRecord } from '@/interfaces/forms.interfaces';

import type { ShippingAddressPreference } from './account.types';

function stringField(formData: FormDataRecord, field: string) {
  return String(formData[field] ?? '');
}

export function toShippingAddressPreference(formData: FormDataRecord): ShippingAddressPreference {
  return {
    fullName: stringField(formData, 'full-name'),
    phoneNumber: stringField(formData, 'phone-number'),
    address1: stringField(formData, 'address-1'),
    address2: stringField(formData, 'address-2'),
    city: stringField(formData, 'city'),
    postalCode: stringField(formData, 'postal-code'),
    state: stringField(formData, 'state'),
    country: stringField(formData, 'country'),
  };
}
