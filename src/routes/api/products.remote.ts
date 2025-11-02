import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { ENDPOINTS } from './config.const';
import type { Product, Price } from '@/interfaces/store.interfaces';
import z from 'zod';

const parseWcPrice = (priceObject: Price): number => {
  const priceInMinorUnit = parseInt(priceObject.price, 10);

  const divisor = Math.pow(10, priceObject.currency_minor_unit);

  return priceInMinorUnit / divisor;
};

export const getProducts = query(async () => {
  try {
    const res = await fetch(ENDPOINTS.PRODUCTS);

    const data = (await res.json()) as Product[];

    if (!data) throw error(500, 'No response from server');

    // const items = data.map(productToItem);

    return data;
  } catch (err) {
    console.error(err);

    throw error(500, 'Error fetching products');
  }
});

const getProductSchema = z.object({
  slug: z.string().min(1).optional(),
  tag: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
});
type getProductsParams = z.infer<typeof getProductSchema>;

export const getProduct = query(getProductSchema, async ({ slug, tag, category }: getProductsParams) => {
  try {
    const requestParams = new URLSearchParams();

    if (slug) requestParams.append('slug', slug);
    if (tag) requestParams.append('tag', tag);
    if (category) requestParams.append('category', category);

    const res = await fetch(`${ENDPOINTS.PRODUCTS}/?${requestParams.toString()}`);

    const products = (await res.json()) as Product[];

    if (!products || products.length === 0) throw error(404, 'Product not found');

    // const items = products.map(productToItem);

    return products;
  } catch (err) {
    console.error(err);

    throw error(500, 'Error fetching products');
  }
});
