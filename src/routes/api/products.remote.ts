import { query, getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
import { ENDPOINTS } from './config.const';
import type { Product } from '@/interfaces/store.interfaces';
import z from 'zod';
import { buildEndpoint, failRemote, fetchJson, rethrowHttpOrFail } from './remote-utils';
import { inStockProducts } from '@/features/products/product.mapper';

export const getProducts = query(async () => {
  try {
    const { fetch } = getRequestEvent();

    const products = await fetchJson<Product[]>(fetch, ENDPOINTS.PRODUCTS);

    if (!products) {
      failRemote('Unable to fetch products');
    }

    return inStockProducts(products);
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch products');
  }
});

const getProductSchema = z.object({
  slug: z.string().min(1).optional(),
  tag: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  include: z.string().min(1).optional(),
});
type GetProductsParams = z.infer<typeof getProductSchema>;

export const getProduct = query(getProductSchema, async ({ slug, tag, category, include }: GetProductsParams) => {
  let products: Product[] = [];

  try {
    const { fetch } = getRequestEvent();

    const requestParams = new URLSearchParams();

    if (slug) requestParams.append('slug', slug);
    if (tag) requestParams.append('tag', tag);
    if (category) requestParams.append('category', category);
    if (include) requestParams.append('include', include);

    const data = await fetchJson<Product[]>(fetch, buildEndpoint(ENDPOINTS.PRODUCTS, Object.fromEntries(requestParams)));

    if (!data) {
      failRemote('Unable to fetch product');
    }

    products = inStockProducts(data);
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch product');
  }

  if (products.length === 0) {
    error(404, 'Product not found');
  }

  return products;
});
