<script lang="ts">
  import { cartStore, type CartItem } from '@/stores/cartStore.store.svelte';
  import type { Item } from '@/stores/itemStore.store.svelte';
  import CartIcon from '../Icons/CartIcon.svelte';

  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';
  import CheckoutIcon from '../Icons/CheckoutIcon.svelte';

  const { item }: { item: Item } = $props();

  let cartItem: CartItem = $state({
    ...item,
    quantity: 1,
  });
</script>

<div class="mt-12 flex flex-col items-stretch p-3 md:flex-row">
  <figure>
    <img
      src={item.image_url}
      alt={item.image_alt}
      title={item.image_alt}
      class="w-[600px] rounded-md bg-white"
    />
  </figure>

  <div class="flex flex-grow flex-col p-3 pb-0 text-right">
    <h1 class="product-title mb-3 p-3 text-2xl font-bold">
      {item.name}
    </h1>
    <div class="flex-grow"></div>
    <div class="mb-5 text-5xl font-bold text-primary">
      {item.price} €
    </div>
    <div class="card-actions mt-3 justify-end">
      <div class="join">
        <button
          onclick={() => {
            if (cartItem.quantity > cartStore.minItems) {
              cartItem.quantity--;
            }
          }}
          class="btn btn-secondary join-item aspect-square p-0"
        >
          <MinusIcon />
        </button>
        <input
          type="number"
          min="1"
          max="999"
          bind:value={cartItem.quantity}
          class="input join-item input-bordered input-secondary w-16"
        />
        <button
          onclick={() => {
            if (cartItem.quantity < cartStore.maxItems) {
              cartItem.quantity++;
            }
          }}
          class="btn btn-primary join-item aspect-square p-0"
        >
          <PlusIcon />
        </button>
      </div>

      <button
        onclick={() => cartStore.addItem(cartItem)}
        class="btn btn-secondary rounded-xl uppercase"
      >
        <CartIcon />
        Add to cart
      </button>
      <button
        class="btn btn-primary rounded-xl uppercase"
        onclick={() => cartStore.checkout()}
      >
        <CheckoutIcon />
        Buy now
      </button>
    </div>
  </div>
</div>
<div class="p-3">
  <h2 class="py-3 text-xl font-bold">Description</h2>
  <p class="mb-10">{item.description}</p>
  <p>
    Categories:
    {#each item.categories as category}
      <a href={`/categories/${category}`}>
        <span class="badge badge-outline mr-2">{category}</span>
      </a>
    {/each}
  </p>
  <p>
    Tags:
    {#each item.tags as tag}
      <a href={`/tag/${tag}`}>
        <span class="badge badge-secondary badge-outline mr-2">{tag}</span>
      </a>
    {/each}
  </p>
</div>
