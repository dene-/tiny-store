export interface AccountPreferences {
  avatar?: string;
  username?: string;
  shippingAddress?: ShippingAddressPreference;
}

export interface ShippingAddressPreference {
  fullName: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface AccountUser {
  id: string;
  name: string;
  email: string;
  labels: string[];
  emailVerified: boolean;
  prefs: AccountPreferences;
}

export interface AccountUpdateInput {
  name: string;
  email: string;
  password: string;
  prefs: AccountPreferences;
}
