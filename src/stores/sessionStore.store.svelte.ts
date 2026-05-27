import type { AccountUser } from '@/features/account/account.types';
import {
  appwriteSessionGateway,
  browserSessionLocation,
  consoleSessionErrorReporter,
  svelteKitSessionNavigator,
  type SessionErrorReporter,
  type SessionGateway,
  type SessionLocation,
  type SessionNavigator,
} from './session-store-deps';

class UseSessionStore {
  hasSessionLoaded = $state(false);
  isLoggedIn = $state(false);
  user: AccountUser | undefined = $state(undefined);

  constructor(
    private readonly sessionGateway: SessionGateway = appwriteSessionGateway,
    private readonly navigator: SessionNavigator = svelteKitSessionNavigator,
    private readonly location: SessionLocation = browserSessionLocation,
    private readonly errorReporter: SessionErrorReporter = consoleSessionErrorReporter,
  ) {}

  async getAccount() {
    try {
      this.user = await this.sessionGateway.getAccount();
      this.isLoggedIn = true;
      this.hasSessionLoaded = true;
      return this.user;
    } catch (error) {
      this.errorReporter.capture(error);
      this.hasSessionLoaded = true;
      return null;
    }
  }

  async logout() {
    try {
      await this.sessionGateway.deleteCurrentSession();
      this.user = undefined;
      this.isLoggedIn = false;

      await this.navigator.goHome();
    } catch (error) {
      this.errorReporter.capture(error);
    }
  }

  async verifyEmail() {
    try {
      await this.sessionGateway.createVerification(this.location.accountUrl());
    } catch (error) {
      this.errorReporter.capture(error);
    }
  }
}

export const sessionStore = new UseSessionStore();
