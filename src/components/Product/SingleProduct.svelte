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

<div class="card w-80 flex-shrink-0 bg-base-300">
  <figure>
    <a href={`/products/${item.product_url}`}>
      <img
        width="320"
        height="256"
        src={item.image_url}
        alt={item.image_alt}
        title={item.image_alt}
        class="rounded-2xl bg-white"
      />
    </a>
  </figure>

  <div class="card-body">
    <h1 class="product-title card-title">
      {item.name}
    </h1>
    <!-- <p>
      {#each item.categories as category}
        <a href={`/categories/${category}`}>
          <span class="badge badge-outline">
            {category}
          </span>
        </a>
      {/each}
    </p> -->
    <div class="card-actions justify-end">
      <!--
      <input
        class="input input-bordered w-16 rounded-xl"
        type="number"
        name="quantity"
      />
      -->

      <div class="text-3xl font-bold text-primary">
        {item.price} €
      </div>
      <button
        onclick={() => cartStore.addItem(cartItem)}
        class="btn btn-secondary mt-3 w-full rounded-xl uppercase"
      >
        <CartIcon />
        Add to cart
      </button>

      <!-- <button
        class="btn btn-primary rounded-xl uppercase"
        onclick={() => cartStore.checkout()}>Buy now</button
      > -->
    </div>
  </div>
</div>
