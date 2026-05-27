import { getProduct } from '@/routes/api/products.remote.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { tag } = params;

  const products = await getProduct({ tag });

  return {
    tag,
    products,
  };
};
