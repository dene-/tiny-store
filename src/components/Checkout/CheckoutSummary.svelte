<script lang="ts">
  import type { CartItem, CartTotals } from '@/interfaces/store.interfaces';
  import ProductTable from '@/components/Product/ProductTable.svelte';

  interface Props {
    items: CartItem[];
    totals: CartTotals;
  }

  let { items, totals }: Props = $props();
</script>

<div class="mt-6">
  <h2 class="mb-6 text-xl font-bold">Resumen pedido</h2>
  <ProductTable
    {items}
    showTotal={true}
    {totals}
  />
</div>
