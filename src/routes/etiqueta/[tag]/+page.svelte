<script lang="ts">
  import ProductGrid from '@/components/Product/ProductGrid.svelte';
  import { capitalizeFirstLetter } from '@/lib/utils.lib';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const tagLabel = $derived(capitalizeFirstLetter(data.tag));
</script>

<svelte:head>
  <title>{data.tag} | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Explora los productos con la etiqueta {tagLabel} en Mami Crafts. Encuentra artículos únicos y hechos a mano que se adaptan a tus necesidades."
  />
</svelte:head>

<div class="my-12 lg:my-24">
  <h1 class="mb-3 p-3 text-2xl font-bold">Tag: {tagLabel}</h1>
  {#if data.products.length}
    <ProductGrid products={data.products} />
  {:else}
    <div class="flex w-full items-center p-3">No se han encontrado productos.</div>
  {/if}
</div>
