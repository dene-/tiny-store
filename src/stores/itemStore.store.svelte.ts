import { type Models } from 'appwrite';

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
}

export const itemStore = new UseItemStore();
