<script lang="ts">
  import PageProduct from '@/components/Product/PageProduct.svelte';
  import type { Product } from '@/interfaces/store.interfaces';

  const { data: product }: { data: Product } = $props();
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
