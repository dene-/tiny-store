<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';

  import TrashBinIcon from '../Icons/TrashBinIcon.svelte';
  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';
  import ProductPrice from './ProductPrice.svelte';

  import type { CartItem } from '@/interfaces/store.interfaces';

  const { item: cartItem }: { item: CartItem } = $props();
</script>

<div class="grid-cell w-full text-left lg:w-auto">
  <a
    href={`${new URL(cartItem.permalink).pathname}`}
    class="flex flex-col gap-1 underline lg:flex-row lg:items-center lg:gap-3"
  >
    <img
      class="w-[85px] rounded-xl bg-white lg:w-[150px]"
      src={cartItem.images[0].src}
      alt={cartItem.images[0].alt}
      title={cartItem.images[0].alt}
    />
    <span class="text-base font-bold lg:text-xl">
      {cartItem.name}
    </span>
  </a>
</div>
<div class="grid-cell justify-end">
  <ProductPrice product={cartItem} />
</div>
<div class="grid-cell justify-end gap-2 md:flex-row">
  {#if cartItem.sold_individually}
    <span class="font-bold">
      {cartItem.quantity}
    </span>
  {:else}
    <div class="join">
      <button
        onclick={() => cartStore.updateItem(cartItem, cartItem.quantity - 1)}
        class="btn btn-secondary btn-sm lg:btn-md join-item aspect-square p-0 text-white"
        disabled={cartItem.quantity === 1}
      >
        <MinusIcon />
      </button>
      <input
        type="text"
        id="cart-quantity-input"
        bind:value={cartItem.quantity}
        class="input join-item input-ghost input-sm lg:input-md pointer-events-none m-0 max-w-[40px] text-right font-bold select-none lg:max-w-[50px]"
      />
      <button
        onclick={() => cartStore.updateItem(cartItem, cartItem.quantity + 1)}
        class="btn btn-primary btn-sm lg:btn-md join-item aspect-square p-0"
        disabled={cartItem.sold_individually || cartItem.quantity === cartItem.low_stock_remaining}
      >
        <PlusIcon />
      </button>
    </div>
  {/if}
</div>
<div class="grid-cell">
  <button
    onclick={() => cartStore.removeItem(cartItem)}
    class="btn btn-primary join-item btn-sm lg:btn-md aspect-square p-0 text-white"
  >
    <TrashBinIcon />
  </button>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .grid-cell {
    @apply flex items-center p-3;
  }
</style>
