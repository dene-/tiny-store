<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';

  import CartProduct from '@/components/Product/CartProduct.svelte';
  import CheckoutIcon from '@/components/Icons/CheckoutIcon.svelte';

  import { formatPrice } from '@/lib/utils.lib';

  import { getCheckoutStatus } from '../api/checkout.remote';
</script>

<svelte:head>
  <title>Carrito | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Revisa los productos en tu carrito de compras en Mami Crafts. Asegúrate de que todo esté listo antes de proceder al pago."
  />
</svelte:head>

<div class="cart mt-12">
  <div class="flex flex-col gap-12 p-3 md:flex-row">
    <div class="flex-grow">
      <h1 class="mb-3 text-2xl font-bold">Carrito</h1>
      {#if !cartStore.cart.items || (cartStore.cart.items && !cartStore.cart.items.length)}
        <div class="flex w-full items-center p-3">Tu carrito está vacío</div>
      {:else}
        <div class="custom-grid w-full">
          <div class="grid-header photo hidden text-left md:block"></div>
          <div class="grid-header name text-left">Nombre</div>
          <div class="grid-header price text-right">Precio</div>
          <div class="grid-header quantity text-right">Cantidad</div>
          <div class="grid-header actions text-right"></div>

          {#each cartStore.cart.items as item (item.id)}
            <CartProduct {item} />
          {/each}
        </div>
      {/if}
    </div>
    <div class="min-w-1/4">
      <h1 class="mb-6 text-2xl font-bold">Resumen pedido</h1>
      <div class="flex w-full flex-col gap-8">
        <!-- <div class="flex items-center justify-between">
          <h3 class="p-0">Subtotal</h3>
          <div>
            {cartStore.cart.totals.currency_prefix}{formatPrice(cartStore.cart.totals.total_items, cartStore.cart.totals)}{cartStore.cart.totals
              .currency_suffix}
          </div>
        </div> -->
        <div class="flex items-center justify-between">
          <h3 class="p-0 font-bold">Total</h3>
          <div>
            {cartStore.cart.totals.currency_prefix}{formatPrice(cartStore.cart.totals.total_price, cartStore.cart.totals)}{cartStore.cart.totals
              .currency_suffix}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <h3 class="p-0"><span class="font-bold">Pago:</span> en la entrega</h3>
        </div>
        <div class="divider"></div>
        <div class="flex items-center justify-between">
          <button
            class="btn btn-primary w-full rounded-xl p-2 md:w-full"
            onclick={() => getCheckoutStatus(cartStore.cartToken)}
          >
            <CheckoutIcon />
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  </div>
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
      grid-template-columns: 1fr auto auto auto;
    }
  }
</style>
