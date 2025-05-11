<script lang="ts">
  import { cartStore } from '$stores/cartStore.store.svelte';
  import type { CartItem } from '@/interfaces/app.interfaces';
  import type { Item } from '@/interfaces/appWrite.interfaces';
  import CartIcon from '@/components/Icons/CartIcon.svelte';

  const { item }: { item: Item } = $props();

  let cartItem: CartItem = $state({
    ...item,
    quantity: 1,
  });
</script>

<div class="card bg-base-300 flex-shrink-0">
  <figure>
    <a href={`/products/${item.product_url}`}>
      <img
        src={item.image_url}
        alt={item.image_alt}
        title={item.image_alt}
        class=" bg-white"
      />
    </a>
  </figure>

  <div class="card-body p-4">
    <h1 class="product-title card-title text-sm md:text-xl">
      {item.name}
    </h1>
    <div class="card-actions justify-end">
      <div class="text-primary text-3xl font-bold">
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
