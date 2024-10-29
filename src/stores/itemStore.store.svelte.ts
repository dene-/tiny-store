import type { Models } from 'appwrite';
import { databases, ids } from '@/lib/appwrite.lib';

export interface Item extends Models.Document {
  $id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  tags: string[];
  categories: string[];
  image_url: string;
  image_alt: string;
  product_url: string;
}

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
