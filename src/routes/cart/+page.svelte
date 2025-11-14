<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';

  import CartProduct from '@/components/Product/CartProduct.svelte';
  import CheckoutIcon from '@/components/Icons/CheckoutIcon.svelte';

  import ProductPrice from '@/components/Product/ProductPrice.svelte';

  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>Carrito | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Revisa los productos en tu carrito de compras en Mami Crafts. Asegúrate de que todo esté listo antes de proceder al pago."
  />
  <meta
    name="robots"
    content="noindex"
  />
</svelte:head>

<div class="cart my-12 lg:my-24">
  <div class="flex flex-col gap-12 p-3 lg:flex-row">
    <div class="flex-grow">
      <h1 class="mb-3 text-2xl font-bold">Carrito</h1>
      {#if !cartStore.cart.items || (cartStore.cart.items && !cartStore.cart.items.length)}
        <div class="flex w-full items-center">Tu carrito está vacío</div>
      {:else}
        <div class="custom-grid w-full">
          <div class="grid-header name text-left">Producto</div>
          <div class="grid-header price text-right">Precio</div>
          <div class="grid-header quantity text-right">Cantidad</div>
          <div class="grid-header actions text-right"></div>

          {#each cartStore.cart.items as item (item.id)}
            <CartProduct {item} />
          {/each}
        </div>
      {/if}
    </div>
    {#if cartStore.cart.items && cartStore.cart.items && cartStore.cart.items.length}
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
          <div class="flex items-center justify-between text-2xl">
            <div class="font-bold">Total:</div>
            <ProductPrice
              isTotalPrice={true}
              totals={cartStore.cart.totals}
            />
          </div>
          <div class="flex items-center justify-between">
            <div class="font-bold">Pago:</div>
            <div>En la entrega</div>
          </div>
          <div class="divider"></div>
          <div class="flex items-center justify-between">
            <button
              class="btn btn-primary btn-lg w-full rounded-xl p-2 lg:w-full"
              onclick={() => goto('/finalizar-compra')}
            >
              <CheckoutIcon />
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    {/if}
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
    grid-template-columns: 1fr auto auto auto;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr auto auto auto;
    }
  }
</style>
