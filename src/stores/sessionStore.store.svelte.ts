import { account } from '@/lib/appwrite.lib';
import type { Models } from 'appwrite';
import { goto } from '$app/navigation';

class UseSessionStore {
  hasSessionLoaded = $state(false);
  isLoggedIn = $state(false);
  user: Models.User<Models.Preferences> | undefined = $state(undefined);

  async getAccount() {
    if (account.get)
      try {
        this.user = await account.get();
        this.isLoggedIn = true;
        this.hasSessionLoaded = true;
        return account;
      } catch (error) {
        console.error(error);
        this.hasSessionLoaded = true;
        return null;
      }
  }

  async logout() {
    try {
      await account.deleteSession('current');
      this.user = undefined;
      this.isLoggedIn = false;

      goto('/');
    } catch (error) {
      console.error(error);
    }
  }

  async updateAccount(name: string, email: string) {
    try {
      await account.updateEmail(name, email);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyEmail() {
    try {
      await account.createVerification('https://localhost:5173/account');
    } catch (error) {
      console.error(error);
    }
  }
}

export const sessionStore = new UseSessionStore();
