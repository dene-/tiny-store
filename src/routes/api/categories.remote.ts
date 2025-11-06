import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { ENDPOINTS } from './config.const';

import type { Category } from '@/interfaces/store.interfaces';

export const getCategories = query(async () => {
  try {
    const res = await fetch(`${ENDPOINTS.CATEGORIES}`);

    if (!res.ok) {
      console.error('Error fetching categories:', res.statusText);
      throw error(500, 'Failed to fetch categories');
    }

    const data = (await res.json()) as Category[];

    // delete permalink from each category
    data.forEach(category => {
      delete category.permalink;
    });

    return data;
  } catch (err) {
    console.error(err);
    throw error(500, 'Error fetching categories');
  }
});
