import { query, getRequestEvent } from '$app/server';
import { ENDPOINTS } from './config.const';
import { failRemote, fetchJson, rethrowHttpOrFail } from './remote-utils';
import { publicCategories } from '@/features/products/product.mapper';

import type { Category } from '@/interfaces/store.interfaces';

export const getCategories = query(async () => {
  try {
    const { fetch } = getRequestEvent();

    const data = await fetchJson<Category[]>(fetch, ENDPOINTS.CATEGORIES);

    if (!data) {
      failRemote('Unable to fetch categories');
    }

    return publicCategories(data);
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch categories');
  }
});
