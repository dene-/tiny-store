import { addItemToCart } from '@/routes/api/cart.remote';
import { removeCartItem } from '@/routes/api/cart.remote';
import { updateCartItem } from '@/routes/api/cart.remote';
import { loginModalStore } from './loginModal.store.svelte';
import { sessionStore } from './sessionStore.store.svelte';

import type { Product } from '@/interfaces/store.interfaces';
import type { Cart } from '@/interfaces/store.interfaces';
import type { CartItem } from '@/interfaces/store.interfaces';

import Toastify from 'toastify-js';

class UseCartStore {
  // Add your store properties here
  cart = $state({}) as Cart;
  cartToken = $state('') as string;
  minQuantity = 1;
  maxQuantity = 99;

  constructor() {
    if (typeof window !== 'undefined') {
      this.cartToken = localStorage.getItem('cart_token') || '';
    }
  }

  // Add your store methods here
  async addItem(product: Product, quantity: number) {
    const { cart } = await addItemToCart({
      id: product.id,
      quantity,
      cartToken: this.cartToken,
    });

    if (cart) {
      this.cart = cart;
    }

    Toastify({
      text: `"${product.name}" añadido al carrito`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: 'oklch(0.4598 0.248 305.03)',
    }).showToast();
  }

  removeItem = async (cartItem: CartItem) => {
    const { cart, message } = await removeCartItem({
      key: cartItem.key,
      cartToken: this.cartToken,
    });

    if (cart) {
      this.cart = cart;
    }

    Toastify({
      text: message || `"${cartItem.name}" eliminado del carrito`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: 'oklch(0.4598 0.248 305.03)',
    }).showToast();
  };

  updateItem = async (cartItem: CartItem, quantity: number) => {
    if (quantity === 0) {
      return this.removeItem(cartItem);
    }

    const { cart, message } = await updateCartItem({
      key: cartItem.key,
      quantity,
      cartToken: this.cartToken,
    });

    if (cart) {
      this.cart = cart;
    }

    Toastify({
      text: message || `"${cartItem.name}" actualizado en el carrito`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: 'oklch(0.4598 0.248 305.03)',
    }).showToast();
  };
}

export const cartStore = new UseCartStore();
