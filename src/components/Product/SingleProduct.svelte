<script lang="ts">
  import { goto } from '$app/navigation';
  import { cartStore } from '$stores/cartStore.store.svelte';
  import type { CartItem } from '@/interfaces/app.interfaces';
  import type { Item } from '@/interfaces/appWrite.interfaces';
  // import CartIcon from '@/components/Icons/CartIcon.svelte';

  const { item }: { item: Item } = $props();

  let cartItem: CartItem = $state({
    ...item,
    quantity: 1,
  });
</script>

<div class="card border-base-300 flex-shrink-0 border bg-white">
  <figure>
    <a href={`/products/${item.product_url}`}>
      <img
        src={item.image_url}
        alt={item.image_alt}
        title={item.image_alt}
        class="drop-shadow-lg"
      />
    </a>
  </figure>

  <div class="card-body p-4">
    <h1 class="product-title card-title justify-center text-sm md:text-xl">
      {item.name}
    </h1>
    <div class="card-actions justify-center">
      <!-- <div class="text-primary text-3xl font-bold">
        {item.price} €
      </div> -->
      <div class="text-center">
        <button
          onclick={() => goto(`/products/${item.product_url}`)}
          class="btn btn-primary mt-3 w-full rounded-xl text-xs uppercase md:text-sm"
        >
          Ver producto
        </button>
      </div>
    </div>
  </div>
</div>
