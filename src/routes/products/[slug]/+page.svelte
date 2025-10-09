<script lang="ts">
  import type { Item } from '@/interfaces/appWrite.interfaces';

  import PageProduct from '@/components/Product/PageProduct.svelte';

  const { data: item }: { data: Item } = $props();
</script>

{#if item}
  <PageProduct {item} />
{:else}
  <div class="flex w-full items-center p-5">No product found</div>
{/if}
