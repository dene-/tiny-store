import { getCart } from './api/cart.remote';
import { getCategories } from './api/categories.remote';
import { cartStore } from '@/stores/cartStore.store.svelte';
import { categoriesStore } from '@/stores/categories.store.svelte';

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

  categoriesStore.categories = await getCategories();

  cartStore.cart = cart;
}
