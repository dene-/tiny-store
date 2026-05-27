import {
  sessionAccountStore,
  accountNotifier,
  appwriteAccountGateway,
  appwriteAvatarStorageGateway,
  toFailure,
  type AccountSessionStore,
  type AccountGateway,
  type AccountNotifier,
  type AvatarStorageGateway,
  type StoreResult,
} from './user-store-deps';
import { toAccountUser, toAppwritePrefs } from '@/features/account/account.mapper';
import type { AccountPreferences, AccountUpdateInput } from '@/features/account/account.types';

export class UseUserStore {
  constructor(
    private readonly accountGateway: AccountGateway = appwriteAccountGateway,
    private readonly avatarStorage: AvatarStorageGateway = appwriteAvatarStorageGateway,
    private readonly accountSession: AccountSessionStore = sessionAccountStore,
    private readonly notifier: AccountNotifier = accountNotifier,
  ) {}

  async logIn(email: string, password: string): Promise<StoreResult> {
    try {
      await this.accountGateway.createEmailPasswordSession(email, password);
      return { ok: true, value: undefined };
    } catch (error) {
      return toFailure(error);
    }
  }

  async register(name: string, email: string, password: string): Promise<StoreResult> {
    try {
      await this.accountGateway.createAccount(name, email, password);
      return { ok: true, value: undefined };
    } catch (error) {
      return toFailure(error);
    }
  }

  async verifyEmail(userId: string, secret: string): Promise<StoreResult> {
    try {
      await this.accountGateway.updateVerification(userId, secret);
      return { ok: true, value: undefined };
    } catch (error) {
      return toFailure(error);
    }
  }

  async updatePrefs(prefs: AccountPreferences = {}): Promise<StoreResult> {
    try {
      const currentUser = this.accountSession.currentUser();

      await this.accountGateway.updatePrefs(
        toAppwritePrefs({
          ...currentUser?.prefs,
          ...prefs,
        }),
      );
      this.accountSession.replaceUser(toAccountUser(await this.accountGateway.getAccount()));
      return { ok: true, value: undefined };
    } catch (error) {
      return toFailure(error);
    }
  }

  async updateAccount({ name, email, password, prefs }: AccountUpdateInput): Promise<StoreResult> {
    try {
      const currentUser = this.accountSession.currentUser();

      if (email !== currentUser?.email) {
        await this.accountGateway.updateEmail(email, password);
      }

      await this.accountGateway.updateName(name);
      await this.accountGateway.updatePrefs(
        toAppwritePrefs({
          ...currentUser?.prefs,
          ...prefs,
        }),
      );

      this.accountSession.replaceUser(toAccountUser(await this.accountGateway.getAccount()));
      this.notifier.success('Account updated!');
      return { ok: true, value: undefined };
    } catch (error) {
      return toFailure(error);
    }
  }

  async uploadAvatar(file: File): Promise<StoreResult> {
    try {
      const currentUser = this.accountSession.currentUser();

      if (!currentUser) {
        throw new Error('User not found');
      }

      const avatarLink = await this.avatarStorage.uploadAvatar(currentUser, file);

      await this.accountGateway.updatePrefs(
        toAppwritePrefs({
          ...currentUser.prefs,
          avatar: avatarLink,
        }),
      );

      this.accountSession.patchPrefs({ avatar: avatarLink });
      return { ok: true, value: undefined };
    } catch (error) {
      return toFailure(error);
    }
  }
}

export const userStore = new UseUserStore();
