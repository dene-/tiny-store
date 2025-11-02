import { getProduct } from '@/routes/api/products.remote.js';

export async function load({ params }) {
  const { category } = params;

  const products = await getProduct({ category });

  return {
    products,
  };
}
