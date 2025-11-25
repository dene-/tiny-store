<script lang="ts">
  import type { Product } from '@/interfaces/store.interfaces';

  let { product }: { product: Product } = $props();
</script>

{#if product.on_sale}
  <div class="bg-primary border-base-100 absolute top-2 right-2 z-1 rounded-lg border-2 p-2 font-bold text-white shadow-lg/40 select-none">¡EN OFERTA!</div>
{/if}
