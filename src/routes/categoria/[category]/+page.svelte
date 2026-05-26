<script lang="ts">
  import ProductGrid from '@/components/Product/ProductGrid.svelte';
  import { capitalizeFirstLetter } from '@/lib/utils.lib';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const categoryLabel = $derived(capitalizeFirstLetter(data.category));
</script>

<svelte:head>
  <title>{data.category} | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Explora los productos en la categoría {categoryLabel} de Mami Crafts. Encuentra artículos únicos y hechos a mano que se adaptan a tus necesidades."
  />
</svelte:head>

<div class="my-12 lg:my-24">
  <h1 class="mb-3 p-3 text-2xl font-bold">Categoría: {categoryLabel}</h1>
  {#if data.products.length}
    <ProductGrid products={data.products} />
  {:else}
    <div class="flex w-full items-center p-3">No se han encontrado productos.</div>
  {/if}
</div>
