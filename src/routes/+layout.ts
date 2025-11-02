import { getCart } from './api/cart.remote';
import { cartStore } from '@/stores/cartStore.store.svelte';

export async function load() {
  let localCartToken = undefined;

  if (typeof window !== 'undefined') {
    localCartToken = localStorage.getItem('cart_token') || undefined;
  }

  const { cart, cartToken } = await getCart(localCartToken);

  if (typeof window !== 'undefined' && cartToken) {
    localStorage.setItem('cart_token', cartToken);
    cartStore.cartToken = cartToken;
  }

  cartStore.cart = cart;
}
