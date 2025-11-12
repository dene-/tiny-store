<script lang="ts">
  import type { CartItem, OrderItem, Product, CartTotals, OrderTotals } from '@/interfaces/store.interfaces';
  import ProductPrice from './ProductPrice.svelte';

  interface Props {
    items: CartItem[] | OrderItem[] | Product[];
    showTotal?: boolean;
    totals?: CartTotals | OrderTotals;
  }

  let { items, showTotal, totals }: Props = $props();
</script>

<div class="border-primary overflow-x-auto rounded-lg border bg-white">
  <table class="table-lg table">
    <thead>
      <tr>
        <th>Producto</th>
        <th class="text-right">Precio</th>
      </tr>
    </thead>
    <tbody>
      {#each items as item (item.id)}
        <tr class="border-base-200 border-t-2">
          <td>
            <div class="flex items-center gap-3">
              <img
                class="inline h-8 rounded-sm"
                src={item.images[0].src}
                alt={item.name}
              />
              <a
                href={`${new URL(item.permalink).pathname}`}
                target="_blank"
                class="hover:text-primary font-semibold underline"
              >
                {item.name}
              </a>
              {#if 'quantity' in item}
                × <span class="font-bold">{item.quantity}</span>
              {/if}
            </div>
          </td>
          <td class="flex items-center justify-end">
            <ProductPrice
              product={item}
              showOfferBadge={false}
              showLineThroughPrice={false}
            />
          </td>
        </tr>
      {/each}
      {#if showTotal && totals}
        <tr class="border-primary border-t-1">
          <th class="text-semibold">Total</th>
          <th class="flex justify-end">
            <ProductPrice
              {totals}
              isTotalPrice={true}
            />
          </th>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
