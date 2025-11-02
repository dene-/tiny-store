<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';

  import TrashBinIcon from '../Icons/TrashBinIcon.svelte';
  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';
  import ProductPrice from './ProductPrice.svelte';

  import type { CartItem } from '@/interfaces/store.interfaces';

  import { formatPrice } from '@/lib/utils.lib';
  import { itemStore } from '@/stores/itemStore.store.svelte';

  const { item: cartItem }: { item: CartItem } = $props();
  $inspect(cartItem);
</script>

<div class="hidden items-center p-5 text-left md:flex">
  <img
    class="w-[100px] rounded-xl bg-white"
    src={cartItem.images[0].src}
    alt={cartItem.images[0].alt}
    title={cartItem.images[0].alt}
  />
</div>
<div class="grid-cell w-full text-left md:w-auto">
  <div class="flex flex-col gap-1">
    <img
      class="w-[100px] rounded-xl bg-white md:hidden"
      src={cartItem.images[0].src}
      alt={cartItem.images[0].alt}
      title={cartItem.images[0].alt}
    />
    <span class="text-sm font-bold md:text-xl">
      {cartItem.name}
    </span>
  </div>
</div>
<div class="grid-cell justify-end">
  <ProductPrice product={cartItem} />
</div>
<div class="grid-cell justify-end gap-2 md:flex-row">
  {#if cartItem.sold_individually}
    {cartItem.quantity}
  {:else}
    <div class="join">
      <button
        onclick={() => cartStore.updateItem(cartItem, cartItem.quantity - 1)}
        class="btn btn-secondary join-item aspect-square p-0 text-white"
        disabled={cartItem.quantity === 1}
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        min="1"
        max="999"
        bind:value={cartItem.quantity}
        class="input join-item input-bordered input-secondary"
      />
      <button
        onclick={() => cartStore.updateItem(cartItem, cartItem.quantity + 1)}
        class="btn btn-primary join-item aspect-square p-0"
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
    class="btn btn-primary join-item aspect-square p-0 text-white"
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
