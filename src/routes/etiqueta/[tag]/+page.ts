import { getProduct } from '@/routes/api/products.remote.js';

export async function load({ params }) {
  const { tag } = params;

  const products = await getProduct({ tag });

  return {
    products,
  };
}
