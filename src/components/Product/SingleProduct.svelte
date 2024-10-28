<script lang="ts">
  import { cartStore, type CartItem } from '$stores/cartStore.store.svelte';
  import type { Item } from '$stores/itemStore.store.svelte';
  import CartIcon from '@/components/Icons/CartIcon.svelte';

  const { item }: { item: Item } = $props();

  let cartItem: CartItem = $state({
    ...item,
    quantity: 1,
  });
</script>

<div class="card flex-shrink-0 bg-base-300">
  <figure>
    <a href={`/products/${item.product_url}`}>
      <img
        src={item.image_url}
        alt={item.image_alt}
        title={item.image_alt}
        class="rounded-2xl bg-white"
      />
    </a>
  </figure>

  <div class="card-body p-4">
    <h1 class="product-title card-title text-sm md:text-xl">
      {item.name}
    </h1>
    <div class="card-actions justify-end">
      <div class="text-3xl font-bold text-primary">
        {item.price} €
      </div>
      <button
        onclick={() => cartStore.addItem(cartItem)}
        class="btn btn-secondary mt-3 w-full rounded-xl text-xs uppercase md:text-sm"
      >
        <CartIcon />
        Add to cart
      </button>
    </div>
  </div>
</div>
