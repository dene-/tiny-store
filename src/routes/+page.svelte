<script lang="ts">
  import { onMount } from 'svelte';
  import SingleProduct from '../components/Product/SingleProduct.svelte';
  import HeroComponent from '@/components/Hero/HeroComponent.svelte';
  import type { ListProductsResponse } from '@/interfaces/store.interfaces';

  import { itemStore } from '$stores/itemStore.store.svelte';

  const { data }: { data: ListProductsResponse } = $props();

  onMount(() => {
    itemStore.products = data.products;
  });
</script>

<svelte:head>
  <title>Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Explora nuestra variedad de productos disponibles en Mami Crafts. Encuentra lo que necesitas con facilidad."
  />
</svelte:head>

<HeroComponent />
<h1 class="mb-3 p-3 text-center text-2xl font-bold">Productos</h1>
{#if !itemStore.products.length}
  <div
    class="mt-12 flex w-full items-center justify-center"
    role="status"
    aria-label="Cargando productos"
  >
    <span
      class="loading loading-spinner loading-lg"
      aria-hidden="true"
    ></span>
  </div>
{:else}
  <div class="grid w-full grid-cols-2 flex-wrap content-start items-start gap-3 p-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each itemStore.products as product (product.id)}
      <SingleProduct {product} />
    {/each}
  </div>
{/if}
