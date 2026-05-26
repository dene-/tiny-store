import { ID, type AppwriteException, type Models } from 'appwrite';
import { account, ids, storage } from '@/lib/appwrite.lib';
import type { AccountUser } from '@/features/account/account.types';
import { sessionStore } from './sessionStore.store.svelte';

export type StoreResult<T = void> = { ok: true; value: T } | { ok: false; error: string };

export interface AccountGateway {
  createEmailPasswordSession(email: string, password: string): Promise<Models.Session>;
  createAccount(name: string, email: string, password: string): Promise<Models.User<Models.Preferences>>;
  getAccount(): Promise<Models.User<Models.Preferences>>;
  updateVerification(userId: string, secret: string): Promise<Models.Token>;
  updateEmail(email: string, password: string): Promise<Models.User<Models.Preferences>>;
  updateName(name: string): Promise<Models.User<Models.Preferences>>;
  updatePrefs(prefs: Models.Preferences): Promise<Models.User<Models.Preferences>>;
}

export interface AvatarStorageGateway {
  uploadAvatar(user: AccountUser, file: File): Promise<string>;
}

export interface AccountSessionStore {
  currentUser(): AccountUser | undefined;
  replaceUser(user: AccountUser): void;
  patchPrefs(prefs: Partial<AccountUser['prefs']>): void;
}

export interface AccountNotifier {
  success(message: string): void;
}

export const appwriteAccountGateway: AccountGateway = {
  createEmailPasswordSession: (email, password) => account.createEmailPasswordSession(email, password),
  createAccount: (name, email, password) => account.create(ID.unique(), email, password, name),
  getAccount: () => account.get(),
  updateVerification: (userId, secret) => account.updateVerification(userId, secret),
  updateEmail: (email, password) => account.updateEmail(email, password),
  updateName: name => account.updateName(name),
  updatePrefs: prefs => account.updatePrefs(prefs),
};

export const appwriteAvatarStorageGateway: AvatarStorageGateway = {
  async uploadAvatar(user, file) {
    const fileExt = file.name.split('.').pop();
    const avatarFile = new File([file], `${user.name}_avatar.${fileExt}`, {
      type: file.type,
    });

    const upload = await storage.createFile(ids.buckets.avatars, ID.unique(), avatarFile);

    if (!upload.$id) {
      throw new Error('Error uploading file');
    }

    return storage.getFileView(ids.buckets.avatars, upload.$id);
  },
};

export const sessionAccountStore: AccountSessionStore = {
  currentUser: () => sessionStore.user,
  replaceUser: user => {
    sessionStore.user = user;
  },
  patchPrefs: prefs => {
    if (!sessionStore.user) return;

    sessionStore.user.prefs = {
      ...sessionStore.user.prefs,
      ...prefs,
    };
  },
};

export const accountNotifier: AccountNotifier = {
  async success(message: string) {
    const Toastify = (await import('toastify-js')).default;

    Toastify({
      text: message,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      backgroundColor: 'oklch(0.4598 0.248 305.03)',
    }).showToast();
  },
};

export function toFailure(error: unknown): StoreResult<never> {
  console.error(error);

  return {
    ok: false,
    error: (error as AppwriteException).message || 'Unexpected account error',
  };
}
