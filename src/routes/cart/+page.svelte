<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';

  import CartProduct from '$components/Product/CartProduct.svelte';
  import CheckoutIcon from '@/components/Icons/CheckoutIcon.svelte';
</script>

<div class="cart">
  <h1 class="mb-3 p-3 text-2xl font-bold">Cart</h1>
  {#if cartStore.items.length === 0}
    <div class="flex w-full items-center p-3">Your cart is empty</div>
  {:else}
    <div class="custom-grid w-full p-3">
      <div class="grid-header photo hidden text-left md:block"></div>
      <div class="grid-header name text-left">Name</div>
      <div class="grid-header price text-right">Price</div>
      <div class="grid-header quantity text-right">Quantity</div>

      {#each cartStore.items as item (item.$id)}
        <CartProduct {item} />
      {/each}
    </div>
    <div class="flex w-full">
      <div class="flex-grow"></div>
      <div class="p-3 text-right">
        <h2 class="py-3 text-xl font-bold">Total</h2>
        <p class="mb-10">{cartStore.total} €</p>
        <button
          class="btn btn-primary rounded-xl uppercase"
          onclick={() => cartStore.checkout()}
        >
          <CheckoutIcon />
          Checkout
        </button>
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
    grid-template-columns: auto 1fr auto auto;

    @media (max-width: 768px) {
      grid-template-columns: 1fr auto auto;
    }
  }
</style>
