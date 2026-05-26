import { getProduct } from '@/routes/api/products.remote.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  const products = await getProduct({ slug });

  return {
    product: products[0],
  };
};
