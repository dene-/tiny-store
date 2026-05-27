import { addItemToCart, getCart, removeCartItem, updateCartItem } from '@/routes/api/cart.remote';
import type { Cart } from '@/interfaces/store.interfaces';
import { toastifyDefaults } from '@/constants/toastify.const';
import Toastify from 'toastify-js';

export interface CartGateway {
  getCart(cartToken?: string): ReturnType<typeof getCart>;
  addItem(input: Parameters<typeof addItemToCart>[0]): ReturnType<typeof addItemToCart>;
  updateItem(input: Parameters<typeof updateCartItem>[0]): ReturnType<typeof updateCartItem>;
  removeItem(input: Parameters<typeof removeCartItem>[0]): ReturnType<typeof removeCartItem>;
}

export interface CartTokenStorage {
  read(): string;
  write(cartToken: string): void;
}

export interface CartNotifier {
  success(message: string): void;
}

export const remoteCartGateway: CartGateway = {
  getCart,
  addItem: addItemToCart,
  updateItem: updateCartItem,
  removeItem: removeCartItem,
};

export const browserCartTokenStorage: CartTokenStorage = {
  read() {
    if (typeof window === 'undefined') return '';

    return localStorage.getItem('cart_token') || '';
  },
  write(cartToken: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart_token', cartToken);
    }
  },
};

export const toastCartNotifier: CartNotifier = {
  success(message: string) {
    Toastify({
      text: message,
      ...toastifyDefaults,
    }).showToast();
  },
};

export function applyCartResponse(currentCart: Cart, nextCart: Cart | undefined): Cart {
  return nextCart || currentCart;
}
