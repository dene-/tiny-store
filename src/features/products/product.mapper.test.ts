import { describe, expect, it } from 'vitest';
import type { Category, Product } from '@/interfaces/store.interfaces';

import { getProductSuggestionIds, inStockProducts, publicCategories } from './product.mapper';

function product(input: Partial<Product>): Product {
  return {
    id: 1,
    is_in_stock: true,
    extensions: {
      product_suggestions: {
        upsell_ids: [],
        related_ids: [],
      },
    },
    ...input,
  } as Product;
}

describe('product mapper', () => {
  it('filters products to purchasable stock', () => {
    expect(inStockProducts([product({ id: 1, is_in_stock: true }), product({ id: 2, is_in_stock: false })]).map(item => item.id)).toEqual([1]);
  });

  it('returns suggestion IDs as comma-separated remote include values', () => {
    const source = product({
      extensions: {
        product_suggestions: {
          upsell_ids: [1, 2],
          related_ids: [3],
        },
      },
    });

    expect(getProductSuggestionIds(source, 'upsell')).toBe('1,2');
    expect(getProductSuggestionIds(source, 'related')).toBe('3');
  });

  it('projects categories without remote permalink metadata', () => {
    const categories = [
      {
        id: 1,
        name: 'Lanas',
        slug: 'lanas',
        description: '',
        parent: 0,
        count: 2,
        image: null,
        review_count: 0,
        permalink: 'https://backend.example/category/lanas',
      },
    ] satisfies Category[];

    expect(publicCategories(categories)).toEqual([
      {
        id: 1,
        name: 'Lanas',
        slug: 'lanas',
        description: '',
        parent: 0,
        count: 2,
        image: null,
        review_count: 0,
      },
    ]);
    expect(categories[0].permalink).toBe('https://backend.example/category/lanas');
  });
});
