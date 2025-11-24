<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import CartProduct from '@/components/Product/CartProduct.svelte';
</script>

<div class="custom-grid w-full">
  <div class="grid-header name text-left">Producto</div>
  <div class="grid-header price text-right">Precio</div>
  <div class="grid-header quantity text-right">Cantidad</div>
  <div class="grid-header actions text-right"></div>

  {#each cartStore.cart.items as item (item.id)}
    <CartProduct {item} />
  {/each}
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .grid-header {
    @apply border-b-2 p-3 font-bold;
  }

  .custom-grid {
    display: grid;
    grid-template-columns: 1fr auto auto auto;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr auto auto auto;
    }
  }
</style>
