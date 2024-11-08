import type { CartItem } from '@/interfaces/app.interfaces';

class UseCheckoutStore {
  checkoutItems: CartItem[] = $state([]);

  total = $derived.by(() => {
    return this.checkoutItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  });

  checkout(item: CartItem) {
    this.checkoutItems = [item];

    // Add your checkout logic here
  }
}

export const checkoutStore = new UseCheckoutStore();
