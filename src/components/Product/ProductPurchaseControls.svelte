<script lang="ts">
  import type { Product } from '@/interfaces/store.interfaces';
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import CartIcon from '../Icons/CartIcon.svelte';
  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';

  const { product }: { product: Product } = $props();

  let quantity = $state(1);
  const isProductInCart = $derived(cartStore.cart.items?.some(item => item.id === product.id) || false);

  function increaseQuantity() {
    quantity = Math.min(quantity + 1, product.add_to_cart.maximum);
  }

  function decreaseQuantity() {
    quantity = Math.max(quantity - 1, product.add_to_cart.minimum);
  }
</script>

<div class="card-actions flex-col gap-3 lg:flex-row">
  {#if !product.sold_individually}
    <div class="join">
      <button
        onclick={decreaseQuantity}
        class="btn btn-secondary join-item aspect-square p-0"
        disabled={isProductInCart || quantity <= product.add_to_cart.minimum}
        aria-label="Disminuir cantidad"
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        min={product.add_to_cart.minimum}
        max={product.add_to_cart.maximum}
        bind:value={quantity}
        class="input join-item input-bordered input-secondary m-0 appearance-none text-right lg:w-16"
        disabled={isProductInCart}
        aria-label="Cantidad del producto"
      />
      <button
        onclick={increaseQuantity}
        class="btn btn-primary join-item aspect-square p-0"
        disabled={quantity >= product.add_to_cart.maximum || isProductInCart}
        aria-label="Aumentar cantidad"
      >
        <PlusIcon />
      </button>
    </div>
  {/if}
  <div class="my-3 flex w-full items-stretch gap-2">
    <button
      onclick={() => cartStore.addItem(product, quantity)}
      class="btn btn-primary btn-lg border-base-300 w-full rounded-xl border-2"
      disabled={!product.is_in_stock || isProductInCart}
    >
      <CartIcon />
      {isProductInCart ? 'Ya en el carrito' : 'Añadir al carrito'}
    </button>
  </div>
</div>
