import { getCategories } from './api/categories.remote';
import { cartStore } from '@/stores/cartStore.store.svelte';
import { categoriesStore } from '@/stores/categories.store.svelte';

export async function load() {
  await cartStore.getCart();

  categoriesStore.categories = await getCategories();
}
