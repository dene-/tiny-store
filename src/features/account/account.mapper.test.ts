import { describe, expect, it } from 'vitest';
import type { Models } from 'appwrite';

import { toAccountUser, toAppwritePrefs } from './account.mapper';

function appwriteUser(user: Partial<Models.User<Models.Preferences>>) {
  return user as unknown as Models.User<Models.Preferences>;
}

describe('account mapper', () => {
  it('maps Appwrite users to the app-owned account user DTO', () => {
    const user = appwriteUser({
      $id: 'user-1',
      name: 'Ada',
      email: 'ada@example.test',
      labels: ['admin'],
      emailVerification: true,
      prefs: {
        avatar: 'https://cdn.example.test/avatar.webp',
        username: 'ada',
        shippingAddress: {
          city: 'Madrid',
        },
      } as Models.Preferences,
    });

    expect(toAccountUser(user)).toEqual({
      id: 'user-1',
      name: 'Ada',
      email: 'ada@example.test',
      labels: ['admin'],
      emailVerified: true,
      prefs: {
        avatar: 'https://cdn.example.test/avatar.webp',
        username: 'ada',
        shippingAddress: {
          city: 'Madrid',
        },
      },
    });
  });

  it('drops unknown or malformed preferences at the Appwrite boundary', () => {
    const user = appwriteUser({
      $id: 'user-2',
      name: 'Grace',
      email: 'grace@example.test',
      labels: [],
      emailVerification: false,
      prefs: {
        avatar: 42,
        username: null,
        shippingAddress: 'not-an-object',
      } as Models.Preferences,
    });

    expect(toAccountUser(user).prefs).toEqual({});
    expect(toAppwritePrefs({ username: 'grace' })).toEqual({ username: 'grace' });
  });
});
