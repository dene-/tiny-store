import { getProduct } from '@/routes/api/products.remote.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { category } = params;

  const products = await getProduct({ category });

  return {
    category,
    products,
  };
};
