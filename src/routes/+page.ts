import type { ItemsResponse } from '@/interfaces/appWrite.interfaces';
import type { Item } from '@/interfaces/appWrite.interfaces';
import { getProducts } from './api/products.remote';

export async function load(): Promise<ItemsResponse> {
  const items: Item[] = [];

  const products = await getProducts();

  if (products.length) {
    for (const product of products) {
      items.push(product);
    }
  }

  return {
    items,
    count: products.length,
  };
}
