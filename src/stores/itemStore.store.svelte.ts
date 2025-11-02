import type { Product } from '@/interfaces/store.interfaces';

class UseItemStore {
  products = $state<Product[]>([]);
}

export const itemStore = new UseItemStore();
