import type { Category, Product } from '@/interfaces/store.interfaces';

export function inStockProducts(products: Product[] | null | undefined) {
  return (products || []).filter(product => product.is_in_stock);
}

export function getProductSuggestionIds(product: Product, type: 'upsell' | 'related') {
  const suggestions = product.extensions.product_suggestions;
  const ids = type === 'upsell' ? suggestions.upsell_ids : suggestions.related_ids;

  return ids.join(',');
}

export function publicCategories(categories: Category[] | null | undefined): Category[] {
  return (categories || []).map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    parent: category.parent,
    count: category.count,
    image: category.image,
    review_count: category.review_count,
  }));
}
