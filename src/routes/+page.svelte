<script lang="ts">
  import { onMount } from 'svelte';
  import SingleProduct from '$components/Product/SingleProduct.svelte';
  import type { ItemsResponse } from '@/interfaces/appWrite.interfaces';

  import { itemStore } from '$stores/itemStore.store.svelte';

  const { data }: { data: ItemsResponse } = $props();

  onMount(() => {
    itemStore.items = data.items;
  });
</script>

<h1 class="mb-3 p-3 text-2xl font-bold">Products</h1>
<div class="flex h-full w-full items-start gap-3 p-3">
  {#if !itemStore.items.length}
    <div class="flex h-[50vh] w-full items-center justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {/if}
  {#each itemStore.items as item (item.$id)}
    <SingleProduct {item} />
  {/each}
</div>
