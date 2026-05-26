import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { toAccountUser } from '@/features/account/account.mapper';
import type { AccountUser } from '@/features/account/account.types';
import { account } from '@/lib/appwrite.lib';

export interface SessionGateway {
  getAccount(): Promise<AccountUser>;
  deleteCurrentSession(): Promise<void>;
  createVerification(redirectUrl: string): Promise<void>;
}

export interface SessionNavigator {
  goHome(): Promise<void> | void;
}

export interface SessionLocation {
  accountUrl(): string;
}

export interface SessionErrorReporter {
  capture(error: unknown): void;
}

export const appwriteSessionGateway: SessionGateway = {
  async getAccount() {
    return toAccountUser(await account.get());
  },
  async deleteCurrentSession() {
    await account.deleteSession('current');
  },
  async createVerification(redirectUrl) {
    await account.createVerification(redirectUrl);
  },
};

export const svelteKitSessionNavigator: SessionNavigator = {
  goHome() {
    return goto(resolve('/'));
  },
};

export function accountVerificationUrl(origin: string) {
  return `${origin}/account`;
}

export const browserSessionLocation: SessionLocation = {
  accountUrl() {
    if (typeof window === 'undefined') return '/account';

    return accountVerificationUrl(window.location.origin);
  },
};

export const consoleSessionErrorReporter: SessionErrorReporter = {
  capture(error) {
    console.error(error);
  },
};
