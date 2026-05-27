<script lang="ts">
  import { itemStore } from '@/stores/itemStore.store.svelte';
  import { onMount } from 'svelte';
  import ProductManagementHeader from './ProductManagementHeader.svelte';
  import ProductManagementTable from './ProductManagementTable.svelte';

  onMount(async () => {
    await itemStore.getItems();
  });
</script>

{#if itemStore.isLoading}
  <div class="flex h-[50vh] items-center justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
{:else}
  <ProductManagementHeader />
  <ProductManagementTable products={itemStore.items} />
{/if}
