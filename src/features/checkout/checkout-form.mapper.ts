import type { FormDataRecord } from '@/interfaces/forms.interfaces';
import type { CheckoutStatusBillingAddress } from '@/interfaces/store.interfaces';

function stringField(formData: FormDataRecord, field: string) {
  return String(formData[field] ?? '');
}

export function toBillingAddress(formData: FormDataRecord): CheckoutStatusBillingAddress {
  return {
    first_name: stringField(formData, 'first_name'),
    last_name: stringField(formData, 'last_name'),
    address_1: stringField(formData, 'address_1'),
    address_2: stringField(formData, 'address_2'),
    country: stringField(formData, 'country'),
    city: stringField(formData, 'city'),
    state: stringField(formData, 'state'),
    postcode: stringField(formData, 'postcode'),
    email: stringField(formData, 'email'),
    phone: stringField(formData, 'phone'),
  };
}
