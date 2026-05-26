<script lang="ts">
  import PageProduct from '@/components/Product/PageProduct.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const product = $derived(data.product);
</script>

<svelte:head>
  <title>{product ? product.name + ' | Tienda Mami Crafts' : 'Producto no encontrado | Tienda Mami Crafts'}</title>
  <meta
    name="description"
    content={product ? product.short_description.replace(/<[^>]+>/g, '') : 'El producto que buscas no se ha encontrado.'}
  />
</svelte:head>

{#if product}
  <PageProduct {product} />
{:else}
  <div class="flex w-full items-center p-5">No product found</div>
{/if}
