<script lang="ts">
  import SingleProduct from './SingleProduct.svelte';
  import type { Product } from '@/interfaces/store.interfaces';

  let { products, size = 'small' }: { products: Product[]; size?: 'small' | 'medium' | 'large' } = $props();

  const gridCols = {
    small: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    medium: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    large: 'grid-cols-2 md:grid-cols-3',
  };
</script>

<div class={`grid w-full flex-wrap content-start items-start gap-3 p-3 ${gridCols[size]}`}>
  {#each products as product (product.id)}
    <SingleProduct {product} />
  {/each}
</div>
