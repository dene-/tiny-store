import type { Item } from '@/stores/itemStore.store.svelte';

export interface ItemsResponse {
  items: Item[];
  count: number;
}
