<script lang="ts">
  import { onMount } from 'svelte';
  import ProductGrid from '@/components/Product/ProductGrid.svelte';
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
  <ProductGrid products={itemStore.products} />
{/if}
