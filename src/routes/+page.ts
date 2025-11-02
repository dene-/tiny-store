import { getProducts } from './api/products.remote';
import type { Product, ListProductsResponse } from '@/interfaces/store.interfaces';

export async function load(): Promise<ListProductsResponse> {
  const products = (await getProducts()) as Product[];

  return {
    products,
  };
}
