<script lang="ts">
  import { itemStore } from '@/stores/itemStore.store.svelte';
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {#each itemStore.items as item (item.$id)}
    <div class="rounded-xl p-5">
      <a href={`/products/${item.url}`}>
        <img
          class="w-full rounded-xl bg-white"
          src={item.image_url}
          alt={item.image_alt}
          title={item.image_alt}
        />
      </a>
      <div class="p-3">
        <a href={`/products/${item.url}`}>
          <span class="text-lg font-bold">{item.name}</span>
        </a>
        <p class="text-sm text-gray-500">{item.description}</p>
        <p class="text-lg font-bold">{item.price} €</p>
      </div>
    </div>
  {/each}
</div>
