import { getProduct } from '@/routes/api/products.remote.js';
import type { ItemsResponse } from '@/interfaces/appWrite.interfaces';

export async function load({ params }): Promise<ItemsResponse> {
  const { category } = params;

  const items = await getProduct({ category });

  return {
    items,
    count: items.length,
  };
}
