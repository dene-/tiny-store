import type { Category } from '@/interfaces/store.interfaces';

class UseCategoriesStore {
  categories: Category[] = $state([]);
}

export const categoriesStore = new UseCategoriesStore();
