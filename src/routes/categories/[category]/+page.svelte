<script lang="ts">
  import { page } from '$app/stores';
  import type { ItemsResponse } from '@/interfaces/appWrite.interfaces';
  import SingleProduct from '$components/Product/SingleProduct.svelte';

  const { data }: { data: ItemsResponse } = $props();
</script>

<h1 class="mb-3 p-3 text-2xl font-bold">{$page.params.category}</h1>
<div class="flex h-full items-start gap-3 p-3">
  {#if data.items.length}
    {#each data.items as item (item.$id)}
      <SingleProduct {item} />
    {/each}
  {:else}
    <div class="flex w-full items-center p-5">No products found</div>
  {/if}
</div>
