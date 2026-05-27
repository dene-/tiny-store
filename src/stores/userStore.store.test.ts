import { describe, expect, it, vi } from 'vitest';
import type { Models } from 'appwrite';

import { UseUserStore } from './userStore.store.svelte';
import type { AccountGateway, AccountNotifier, AccountSessionStore, AvatarStorageGateway } from './user-store-deps';
import type { AccountUser } from '@/features/account/account.types';

function appwriteUser(user: Partial<Models.User<Models.Preferences>>) {
  return user as unknown as Models.User<Models.Preferences>;
}

function createAccountGateway(overrides: Partial<AccountGateway> = {}): AccountGateway {
  return {
    createEmailPasswordSession: vi.fn(),
    createAccount: vi.fn(),
    getAccount: vi.fn(),
    updateVerification: vi.fn(),
    updateEmail: vi.fn(),
    updateName: vi.fn(),
    updatePrefs: vi.fn(),
    ...overrides,
  } as AccountGateway;
}

function createSessionStore(user: AccountUser | undefined): AccountSessionStore & { user: AccountUser | undefined } {
  return {
    user,
    currentUser() {
      return this.user;
    },
    replaceUser(nextUser) {
      this.user = nextUser;
    },
    patchPrefs(prefs) {
      if (!this.user) return;
      this.user.prefs = { ...this.user.prefs, ...prefs };
    },
  };
}

describe('user store', () => {
  it('updates preferences through the account gateway and replaces the session user', async () => {
    const session = createSessionStore({
      id: 'user-1',
      name: 'Ada',
      email: 'ada@example.test',
      labels: [],
      emailVerified: true,
      prefs: { username: 'ada' },
    });
    const gateway = createAccountGateway({
      updatePrefs: vi.fn(),
      getAccount: vi.fn().mockResolvedValue(
        appwriteUser({
          $id: 'user-1',
          name: 'Ada',
          email: 'ada@example.test',
          labels: [],
          emailVerification: true,
          prefs: { username: 'ada', avatar: 'avatar.webp' },
        }),
      ),
    });
    const store = new UseUserStore(gateway, {} as AvatarStorageGateway, session, {} as AccountNotifier);

    await expect(store.updatePrefs({ avatar: 'avatar.webp' })).resolves.toEqual({
      ok: true,
      value: undefined,
    });

    expect(gateway.updatePrefs).toHaveBeenCalledWith({ username: 'ada', avatar: 'avatar.webp' });
    expect(session.user?.prefs).toEqual({ username: 'ada', avatar: 'avatar.webp' });
  });

  it('only updates email when the requested email differs from the current session user', async () => {
    const session = createSessionStore({
      id: 'user-1',
      name: 'Ada',
      email: 'ada@example.test',
      labels: [],
      emailVerified: true,
      prefs: {},
    });
    const notifier: AccountNotifier = { success: vi.fn() };
    const gateway = createAccountGateway({
      updateEmail: vi.fn(),
      updateName: vi.fn(),
      updatePrefs: vi.fn(),
      getAccount: vi.fn().mockResolvedValue(
        appwriteUser({
          $id: 'user-1',
          name: 'Ada Lovelace',
          email: 'ada@example.test',
          labels: [],
          emailVerification: true,
          prefs: {},
        }),
      ),
    });
    const store = new UseUserStore(gateway, {} as AvatarStorageGateway, session, notifier);

    await store.updateAccount({
      name: 'Ada Lovelace',
      email: 'ada@example.test',
      password: 'secret',
      prefs: {},
    });

    expect(gateway.updateEmail).not.toHaveBeenCalled();
    expect(gateway.updateName).toHaveBeenCalledWith('Ada Lovelace');
    expect(notifier.success).toHaveBeenCalledWith('Account updated!');
  });

  it('uploads avatars without knowing about the concrete session singleton', async () => {
    const session = createSessionStore({
      id: 'user-1',
      name: 'Ada',
      email: 'ada@example.test',
      labels: [],
      emailVerified: true,
      prefs: { username: 'ada' },
    });
    const gateway = createAccountGateway({
      updatePrefs: vi.fn(),
    });
    const avatarStorage: AvatarStorageGateway = {
      uploadAvatar: vi.fn().mockResolvedValue('https://cdn.example.test/avatar.webp'),
    };
    const store = new UseUserStore(gateway, avatarStorage, session, {} as AccountNotifier);
    const file = new File(['avatar'], 'avatar.webp', { type: 'image/webp' });

    await store.uploadAvatar(file);

    expect(avatarStorage.uploadAvatar).toHaveBeenCalledWith(expect.objectContaining({ id: 'user-1' }), file);
    expect(gateway.updatePrefs).toHaveBeenCalledWith({
      username: 'ada',
      avatar: 'https://cdn.example.test/avatar.webp',
    });
    expect(session.user?.prefs.avatar).toBe('https://cdn.example.test/avatar.webp');
  });
});
