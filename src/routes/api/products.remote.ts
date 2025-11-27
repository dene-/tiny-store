import { query, getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
import { ENDPOINTS } from './config.const';
import type { Product } from '@/interfaces/store.interfaces';
import z from 'zod';

import { oauth } from './config.const';

export const getProducts = query(async () => {
  try {
    const { fetch } = getRequestEvent();

    // Generate OAuth params
    const oauthParams = oauth.authorize({
      url: ENDPOINTS.PRODUCTSV3,
      method: 'GET',
    });

    // Create the Authorization header
    const authHeader = oauth.toHeader(oauthParams);

    const res = await fetch(ENDPOINTS.PRODUCTS, {
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
      },
    });

    let data = (await res.json()) as Product[];

    if (!data) {
      console.error('No response from server');
      return [];
    }

    data = data.filter(product => product.is_in_stock);

    return data;
  } catch (err) {
    console.error(err);

    return [];
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
  try {
    const { fetch } = getRequestEvent();

    const requestParams = new URLSearchParams();

    if (slug) requestParams.append('slug', slug);
    if (tag) requestParams.append('tag', tag);
    if (category) requestParams.append('category', category);
    if (include) requestParams.append('include', include);

    const res = await fetch(`${ENDPOINTS.PRODUCTS}/?${requestParams.toString()}`);

    let products = (await res.json()) as Product[];

    if (!products || products.length === 0) throw error(404, 'Product not found');

    products = products.filter(product => product.is_in_stock);

    return products;
  } catch (err) {
    console.error(err);

    return [];
  }
});
