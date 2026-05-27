<script lang="ts">
  import type { Product } from '@/interfaces/store.interfaces';
  import { getProduct } from '@/routes/api/products.remote';
  import { getProductSuggestionIds } from '@/features/products/product.mapper';
  import ProductGrid from './ProductGrid.svelte';

  const { product, type }: { product: Product; type: 'upsell' | 'related' } = $props();

  const include = $derived(getProductSuggestionIds(product, type));
  const title = $derived(type === 'upsell' ? 'También te recomendamos...' : 'Productos relacionados');
</script>

{#if include}
  {@const products = await getProduct({ include })}

  <h2 class="mt-12 mb-3 p-3 text-2xl font-bold">{title}</h2>
  <ProductGrid
    {products}
    size="medium"
  />
{/if}
