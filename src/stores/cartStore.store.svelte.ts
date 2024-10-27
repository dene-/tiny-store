import type { Item } from './itemStore.store.svelte';
import { loginModalStore } from './loginModal.store.svelte';
import { sessionStore } from './sessionStore.store.svelte';
import Toastify from 'toastify-js';

export interface CartItem extends Item {
  quantity: number;
}

class UseCartStore {
  // Add your store properties here
  items: CartItem[] = $state([]);
  maxItems = 999;
  minItems = 1;

  total = $derived.by(() => {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  });

  constructor() {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('cart');
      if (items) {
        this.items = JSON.parse(items) as CartItem[];
      }
    }
  }

  // Add your store methods here
  addItem = (item: CartItem) => {
    if (this.items.some(i => i.$id === item.$id)) {
      this.items = this.items.map(i => {
        if (i.$id === item.$id) {
          i.quantity += item.quantity;

          Toastify({
            text: `"${item.name}" added to cart. Quantity updated to ${i.quantity}`,
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            backgroundColor: 'oklch(0.4598 0.248 305.03)',
          }).showToast();
        }
        return i;
      });
      return;
    }

    this.items.push(item);

    this.updateLocalStorage();

    Toastify({
      text: `"${item.name}" added to cart`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: 'oklch(0.4598 0.248 305.03)',
    }).showToast();
  };

  removeItem = (item: Item) => {
    this.items = this.items.filter(i => i.$id !== item.$id);

    this.updateLocalStorage();
  };

  decreaseItemQuantity = (item: Item) => {
    this.items = this.items.map(i => {
      if (i.$id === item.$id && i.quantity > this.minItems) {
        i.quantity -= 1;
      }
      return i;
    });

    this.updateLocalStorage();
  };

  increaseItemQuantity = (item: Item) => {
    this.items = this.items.map(i => {
      if (i.$id === item.$id && i.quantity < this.maxItems) {
        i.quantity += 1;
      }
      return i;
    });

    this.updateLocalStorage();
  };

  updateLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  };

  checkout = () => {
    if (this.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!sessionStore.isLoggedIn) {
      loginModalStore.open();
      return;
    }

    alert('Checkout feature is not implemented');
  };
}

export const cartStore = new UseCartStore();
