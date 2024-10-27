import { userStore } from './userStore.store.svelte';
import { sessionStore } from './sessionStore.store.svelte';

class UseLoginModalStore {
  isOpen = $state(false);

  isLoading = $state(false);
  error = $state('');

  open = () => {
    this.isOpen = true;
  };

  close = () => {
    this.isOpen = false;
  };

  async logIn(email: string, password: string) {
    this.isLoading = true;
    this.error = '';

    const loginResult = await userStore.logIn(email, password);

    this.isLoading = false;

    if (loginResult !== 'success') {
      this.error = loginResult;
      return 'error';
    }

    sessionStore.getAccount();
    this.close();

    return loginResult;
  }

  async register(name: string, email: string, password: string) {
    this.isLoading = true;
    this.error = '';

    const registerResult = await userStore.register(name, email, password);

    this.isLoading = false;

    if (registerResult !== 'success') {
      this.error = registerResult;
      return 'error';
    }

    sessionStore.getAccount();
    this.close();

    return registerResult;
  }
}

export const loginModalStore = new UseLoginModalStore();
