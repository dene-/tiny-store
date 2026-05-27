import { getProducts } from './api/products.remote';
import type { ListProductsResponse } from '@/interfaces/store.interfaces';

export async function load(): Promise<ListProductsResponse> {
  const products = await getProducts();

  return {
    products,
  };
}
