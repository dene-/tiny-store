<script lang="ts">
  import { resolve } from '$app/paths';
  import { formatProductPrice } from '@/features/products/product-admin';
  import type { Product } from '@/interfaces/store.interfaces';
  import ProductManagementActions from './ProductManagementActions.svelte';

  let { products }: { products: Product[] } = $props();
</script>

<div class="w-full overflow-x-auto">
  <table class="table-pin-rows table w-full">
    <colgroup>
      <col width="0%" />
      <col width="20%" />
      <col width="100%" />
      <col width="100%" />
      <col width="0%" />
    </colgroup>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th class="text-right">Price</th>
        <th class="text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each products as item (item.id)}
        <tr class="hover">
          <td>
            <div class="w-20">
              <img
                class="rounded-lg"
                src={item.images[0]?.thumbnail || item.images[0]?.src}
                alt={item.images[0]?.alt || item.name}
                title={item.images[0]?.alt || item.name}
              />
            </div>
          </td>
          <td>
            <a
              href={resolve('/producto/[slug]', { slug: item.slug })}
              class="font-bold hover:underline"
            >
              {item.name}
            </a>
          </td>
          <td class="max-w-[1px]">
            <div class="truncate text-sm text-gray-500">
              {item.short_description || item.description}
            </div>
          </td>
          <td class="text-right font-bold text-nowrap tabular-nums">{formatProductPrice(item.prices.price)} €</td>
          <td>
            <ProductManagementActions />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
