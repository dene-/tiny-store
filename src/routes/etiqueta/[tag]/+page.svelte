<script lang="ts">
  import { page } from '$app/state';
  import SingleProduct from '@/components/Product/SingleProduct.svelte';
  import type { Product } from '@/interfaces/store.interfaces';

  import { capitalizeFirstLetter } from '@/lib/utils.lib';

  interface ProductsResponse {
    products: Product[];
  }

  const { data }: { data: ProductsResponse } = $props();
</script>

<svelte:head>
  <title>{page.params.tag} | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Explora los productos con la etiqueta {capitalizeFirstLetter(
      page.params.tag as string,
    )} en Mami Crafts. Encuentra artículos únicos y hechos a mano que se adaptan a tus necesidades."
  />
</svelte:head>

<div class="my-12 lg:my-24">
  <h1 class="mb-3 p-3 text-2xl font-bold">Tag: {capitalizeFirstLetter(page.params.tag as string)}</h1>
  <div class="grid w-full grid-cols-2 flex-wrap content-start items-start gap-3 p-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#if data.products.length}
      {#each data.products as product (product.id)}
        <SingleProduct {product} />
      {/each}
    {:else}
      <div class="flex w-full items-center p-5">No products found</div>
    {/if}
  </div>
</div>
