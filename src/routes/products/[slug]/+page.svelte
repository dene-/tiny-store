<script lang="ts">
  import PageProduct from '@/components/Product/PageProduct.svelte';
  import type { Product } from '@/interfaces/store.interfaces';

  const { data: product }: { data: Product } = $props();
</script>

{#if product}
  <PageProduct {product} />
{:else}
  <div class="flex w-full items-center p-5">No product found</div>
{/if}
