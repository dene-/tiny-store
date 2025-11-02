<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';

  import CartProduct from '@/components/Product/CartProduct.svelte';
  import CheckoutIcon from '@/components/Icons/CheckoutIcon.svelte';

  import { formatPrice } from '@/lib/utils.lib';
</script>

<div class="cart">
  <h1 class="mb-3 p-3 text-2xl font-bold">Carrito</h1>
  {#if !cartStore.cart.items || (cartStore.cart.items && !cartStore.cart.items.length)}
    <div class="flex w-full items-center p-3">Tu carrito está vacío</div>
  {:else}
    <div class="custom-grid w-full p-3">
      <div class="grid-header photo hidden text-left md:block"></div>
      <div class="grid-header name text-left">Nombre</div>
      <div class="grid-header price text-right">Precio</div>
      <div class="grid-header quantity text-right">Cantidad</div>
      <div class="grid-header actions text-right"></div>

      {#each cartStore.cart.items as item (item.id)}
        <CartProduct {item} />
      {/each}
    </div>
    <div class="flex w-full">
      <div class="flex-grow"></div>
      <div class="p-3 text-right">
        <h2 class="py-3 text-xl font-bold">Total</h2>
        <p class="mb-10">
          {cartStore.cart.totals.currency_prefix}{formatPrice(cartStore.cart.totals.total_price, cartStore.cart.totals)}{cartStore.cart.totals.currency_suffix}
        </p>
        <!-- <button
          class="btn btn-primary rounded-xl uppercase"
          onclick={() => cartStore.checkout()}
        >
          <CheckoutIcon />
          Terminar compra
        </button> -->
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .grid-header {
    @apply border-b-2 p-3 font-bold;
  }

  .grid-cell {
    align-items: center;
  }

  .custom-grid {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;

    @media (max-width: 768px) {
      grid-template-columns: 1fr auto auto;
    }
  }
</style>
