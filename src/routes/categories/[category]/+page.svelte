<script lang="ts">
  import { page } from '$app/stores';
  import SingleProduct from '@/components/Product/SingleProduct.svelte';
  import type { Product } from '@/interfaces/store.interfaces';

  interface ProductsResponse {
    products: Product[];
  }

  const { data }: { data: ProductsResponse } = $props();

  $inspect(data);
</script>

<svelte:head>
  <title>{$page.params.category} | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Explora los productos en la categoría {$page.params
      .category} de Mami Crafts. Encuentra artículos únicos y hechos a mano que se adaptan a tus necesidades."
  />
</svelte:head>

<h1 class="mb-3 p-3 text-2xl font-bold">{$page.params.category}</h1>
<div class="flex h-full items-start gap-3 p-3">
  {#if data.products.length}
    {#each data.products as product (product.id)}
      <SingleProduct {product} />
    {/each}
  {:else}
    <div class="flex w-full items-center p-5">No products found</div>
  {/if}
</div>
