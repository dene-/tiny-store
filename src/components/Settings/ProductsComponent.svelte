<script lang="ts">
  import { itemStore } from '@/stores/itemStore.store.svelte';
  import { onMount } from 'svelte';

  import PlusIcon from '../Icons/PlusIcon.svelte';
  import EditIcon from '../Icons/EditIcon.svelte';
  import DuplicateIcon from '../Icons/DuplicateIcon.svelte';
  import DeleteIcon from '../Icons/DeleteIcon.svelte';

  onMount(async () => {
    await itemStore.getItems();
  });
</script>

{#await itemStore.getItems()}
  <div class="flex h-[50vh] items-center justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
{:then}
  <div class="mb-3 flex w-full items-center">
    <h1 class=" flex-grow text-2xl font-bold">Store Products</h1>
    <button class="btn btn-outline btn-sm">
      <PlusIcon />
      Add product
    </button>
  </div>
  <div class="w-full overflow-x-auto">
    <table class="table table-pin-rows w-full">
      <colgroup>
        <col width="0%" />
        <col width="20%" />
        <col width="100%" />
        <col width="100%" />
        <col width="0%" />
      </colgroup>
      <!-- Table header -->
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th class="text-right">Price</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        {#each itemStore.items as item (item.$id)}
          <tr class="hover">
            <td>
              <div class="w-20">
                <img
                  class="rounded-lg"
                  src={item.image_url}
                  alt={item.image_alt}
                  title={item.image_alt}
                />
              </div>
            </td>
            <td>
              <a
                href={`/products/${item.url}`}
                class="font-bold hover:underline"
              >
                {item.name}
              </a>
            </td>
            <td class="max-w-[1px]">
              <div class="truncate text-sm text-gray-500">
                {item.description}
              </div>
            </td>
            <td class="text-nowrap text-right font-bold tabular-nums">{item.price.toFixed(2)} €</td>
            <td>
              <div class="flex justify-end gap-1">
                <!-- Edit -->
                <button
                  class="btn btn-ghost btn-xs aspect-square p-0"
                  title="Edit"
                  aria-label="Edit"
                >
                  <EditIcon />
                </button>

                <!-- Duplicate -->
                <button
                  class="btn btn-ghost btn-xs aspect-square p-0"
                  title="Duplicate"
                  aria-label="Duplicate"
                >
                  <DuplicateIcon />
                </button>

                <!-- Delete -->
                <button
                  class="btn btn-ghost btn-xs aspect-square p-0 text-error"
                  title="Delete"
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/await}
