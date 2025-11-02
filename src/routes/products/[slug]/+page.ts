import { getProduct } from '@/routes/api/products.remote.js';
import type { Product } from '@/interfaces/store.interfaces.js';

export async function load({ params }): Promise<Product | undefined> {
  const { slug } = params;

  const products = await getProduct({ slug });

  return products[0];
}
