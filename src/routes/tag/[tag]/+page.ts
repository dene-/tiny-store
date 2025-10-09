import { getProduct } from '@/routes/api/products.remote.js';
import type { ItemsResponse } from '@/interfaces/appWrite.interfaces';

export async function load({ params }): Promise<ItemsResponse> {
  const { tag } = params;

  const items = await getProduct({ tag });

  return {
    items,
    count: items.length,
  };
}
