import type { Item } from '@/interfaces/appWrite.interfaces';
import { getProduct } from '@/routes/api/products.remote.js';

export async function load({ params }): Promise<Item | undefined> {
  const { slug } = params;

  console.log('Loading product with slug:', slug);

  const item = await getProduct({ slug });

  return item[0];
}
