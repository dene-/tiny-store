<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import type { CartItem } from '@/interfaces/app.interfaces';

  import TrashBinIcon from '../Icons/TrashBinIcon.svelte';
  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';

  const { item: cartItem }: { item: CartItem } = $props();
</script>

<div class="hidden items-center p-5 text-left md:flex">
  <a href={`/products/${cartItem.product_url}`}>
    <img
      class="w-[150px] rounded-xl bg-white"
      src={cartItem.image_url}
      alt={cartItem.image_alt}
      title={cartItem.image_alt}
    />
  </a>
</div>
<div class="grid-cell w-full text-left md:w-auto">
  <a href={`/products/${cartItem.product_url}`}>
    <span class="text-sm font-bold md:text-xl">
      {cartItem.name}
    </span>
  </a>
</div>
<div class="grid-cell justify-end">{cartItem.price * cartItem.quantity} €</div>
<div class="grid-cell flex-col !items-end gap-2 md:flex-row md:!items-center">
  <div class="join">
    <button
      onclick={() => cartStore.decreaseItemQuantity(cartItem)}
      class="btn btn-secondary join-item aspect-square p-0 text-white"
    >
      {#if cartItem.quantity === 1}
        <TrashBinIcon />
      {:else}
        <MinusIcon />
      {/if}
    </button>
    <input
      type="number"
      min="1"
      max="999"
      bind:value={cartItem.quantity}
      class="input join-item input-bordered input-secondary w-16"
    />
    <button
      onclick={() => cartStore.increaseItemQuantity(cartItem)}
      class="btn btn-primary join-item aspect-square p-0"
    >
      <PlusIcon />
    </button>
  </div>
</div>

<style lang="scss">
  .grid-cell {
    @apply flex items-center p-3;
  }
</style>
