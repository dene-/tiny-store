import { userStore } from './userStore.store.svelte';
import { sessionStore } from './sessionStore.store.svelte';
import { Modal } from '@/lib/modal.lib.svelte';

class UseLoginModalStore extends Modal {
  private async runAuthAction(action: () => Promise<{ ok: true } | { ok: false; error: string }>) {
    this.isLoading = true;
    this.error = '';

    const result = await action();

    this.isLoading = false;

    if (!result.ok) {
      this.error = result.error;
      return 'error';
    }

    await sessionStore.getAccount();
    this.close();

    return 'success';
  }

  async logIn(email: string, password: string) {
    return this.runAuthAction(() => userStore.logIn(email, password));
  }

  async register(name: string, email: string, password: string) {
    return this.runAuthAction(() => userStore.register(name, email, password));
  }
}

export const loginModalStore = new UseLoginModalStore();
