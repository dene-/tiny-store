import { addItemToCart } from '@/routes/api/cart.remote';
import { removeCartItem } from '@/routes/api/cart.remote';
import { updateCartItem } from '@/routes/api/cart.remote';

import { getCart } from '@/routes/api/cart.remote';

import type { Product } from '@/interfaces/store.interfaces';
import type { Cart } from '@/interfaces/store.interfaces';
import type { CartItem } from '@/interfaces/store.interfaces';

import Toastify from 'toastify-js';
import { toastifyDefaults } from '@/constants/toastify.const';

class UseCartStore {
  // Add your store properties here
  cart = $state({}) as Cart;
  cartToken = $state('') as string;
  cartNonce = $state('') as string;
  minQuantity = 1;
  maxQuantity = 99;

  constructor() {
    if (typeof window !== 'undefined') {
      this.cartToken = localStorage.getItem('cart_token') || '';
    }
  }

  async getCart() {
    let localCartToken = undefined;
    let localNonceToken = undefined;

    if (typeof window !== 'undefined') {
      localCartToken = localStorage.getItem('cart_token') || undefined;
      localNonceToken = localStorage.getItem('nonce_token') || undefined;
    }

    const { cart, cartToken, nonce } = await getCart(localCartToken);

    if (typeof window !== 'undefined' && cartToken) {
      localStorage.setItem('cart_token', cartToken);
      if (nonce) {
        localStorage.setItem('nonce_token', nonce);
        cartStore.cartNonce = nonce;
      }
      cartStore.cartToken = cartToken;
    }

    this.cart = cart;
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
      ...toastifyDefaults,
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
      ...toastifyDefaults,
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
      ...toastifyDefaults,
    }).showToast();
  };

  async cartTokenNonceReady() {
    return new Promise<void>(resolve => {
      const checkReady = () => {
        if (this.cartToken && this.cartNonce) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }
}

export const cartStore = new UseCartStore();
