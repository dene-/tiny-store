import { query, getRequestEvent } from '$app/server';
import { ENDPOINTS } from './config.const';

import type { Category } from '@/interfaces/store.interfaces';

export const getCategories = query(async () => {
  try {
    const { fetch } = getRequestEvent();

    const res = await fetch(`${ENDPOINTS.CATEGORIES}`);

    if (!res.ok) {
      console.error('Error fetching categories:', res.statusText);
      return [];
    }

    const data = (await res.json()) as Category[];

    // delete permalink from each category
    data.forEach(category => {
      delete category.permalink;
    });

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
});
