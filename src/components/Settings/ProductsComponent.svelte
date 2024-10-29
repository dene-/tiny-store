<script lang="ts">
  import { itemStore } from '@/stores/itemStore.store.svelte';
  import { onMount } from 'svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';

  onMount(async () => {
    await itemStore.getItems();
  });
</script>

{#await itemStore.getItems()}
  <div class="flex h-[50vh] items-center justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
{:then}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    ></path>
                  </svg>
                </button>

                <!-- Duplicate -->
                <button
                  class="btn btn-ghost btn-xs aspect-square p-0"
                  title="Duplicate"
                  aria-label="Duplicate"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    ></path>
                  </svg>
                </button>

                <!-- Delete -->
                <button
                  class="btn btn-ghost btn-xs aspect-square p-0 text-error"
                  title="Delete"
                  aria-label="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    ></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="fixed bottom-0 right-0 flex items-center">
    Add product
    <button class="btn !btn-circle btn-outline btn-lg m-5 animate-pulse bg-base-100">
      <PlusIcon />
    </button>
  </div>
{/await}
