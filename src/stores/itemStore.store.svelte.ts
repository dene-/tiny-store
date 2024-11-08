import { databases, ids } from '@/lib/appwrite.lib';
import type { Item } from '@/interfaces/appWrite.interfaces';

class UseItemStore {
  items = $state<Item[]>([]);
  count = $state(0);

  async getItems() {
    const { documents, total } = await databases.listDocuments(ids.databases.STORE, ids.collections.ITEMS);
    this.items = documents as Item[];
    this.count = total;
  }
}

export const itemStore = new UseItemStore();
