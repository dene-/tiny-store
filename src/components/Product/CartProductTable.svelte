<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import CartProduct from '@/components/Product/CartProduct.svelte';
</script>

<div
  class="custom-grid w-full"
  role="table"
  aria-label="Lista de productos en el carrito"
>
  <div
    class="grid-header name text-left"
    role="columnheader"
  >
    Producto
  </div>
  <div
    class="grid-header price text-right"
    role="columnheader"
  >
    Precio
  </div>
  <div
    class="grid-header quantity text-right"
    role="columnheader"
  >
    Cantidad
  </div>
  <div
    class="grid-header actions text-right"
    role="columnheader"
    aria-label="Acciones"
  ></div>

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
