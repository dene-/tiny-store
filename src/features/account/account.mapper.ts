import type { Models } from 'appwrite';

import type { AccountPreferences, AccountUser, ShippingAddressPreference } from './account.types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toAccountPrefs(prefs: Models.Preferences | undefined): AccountPreferences {
  const accountPrefs: AccountPreferences = {};

  if (!prefs) return accountPrefs;

  if (typeof prefs.avatar === 'string') {
    accountPrefs.avatar = prefs.avatar;
  }

  if (typeof prefs.username === 'string') {
    accountPrefs.username = prefs.username;
  }

  if (isRecord(prefs.shippingAddress)) {
    accountPrefs.shippingAddress = prefs.shippingAddress as unknown as ShippingAddressPreference;
  }

  return accountPrefs;
}

export function toAppwritePrefs(prefs: AccountPreferences): Models.Preferences {
  return {
    ...(prefs.avatar ? { avatar: prefs.avatar } : {}),
    ...(prefs.username ? { username: prefs.username } : {}),
    ...(prefs.shippingAddress ? { shippingAddress: prefs.shippingAddress } : {}),
  };
}

export function toAccountUser(user: Models.User<Models.Preferences>): AccountUser {
  return {
    id: user.$id,
    name: user.name,
    email: user.email,
    labels: user.labels,
    emailVerified: user.emailVerification,
    prefs: toAccountPrefs(user.prefs),
  };
}
