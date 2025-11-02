<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import type { Product } from '@/interfaces/store.interfaces';
  import CartIcon from '../Icons/CartIcon.svelte';

  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';
  import ProductPrice from './ProductPrice.svelte';
  import { ca } from 'zod/locales';

  const { product }: { product: Product } = $props();
  let quantity = $state(1);

  $inspect(product);
</script>

<div class="mx-auto md:max-w-[900px]">
  <div class="mt-12 flex flex-col items-stretch gap-6 md:flex-row">
    <figure class="min-w-1/2">
      <img
        src={product.images[0].src}
        alt={product.images[0].alt}
        title={product.images[0].alt}
        class="bg-white md:rounded-md"
      />
    </figure>

    <div class="flex flex-grow flex-col p-3 pb-0">
      {#if product.on_sale}
        <div class="badge badge-primary badge-lg mb-3">¡En oferta!</div>
      {/if}
      <div class="prose">
        <h1 class="product-title text-primary">
          {product.name}
        </h1>
      </div>
      <div>
        SKU: {product.sku ? product.sku : 'N/A'}
      </div>
      <!-- Product in stock indicador -->
      {#if product.stock_availability && product.stock_availability.text}
        <div class="my-3 text-lg font-semibold">
          <span class={`badge badge-lg badge-${product.stock_availability.class}`}>
            {product.stock_availability.text}
          </span>
        </div>
      {/if}
      <div class="py-3 text-2xl">
        <ProductPrice {product} />
      </div>
      <div class="card-actions flex-col gap-3 md:flex-row">
        {#if !product.sold_individually}
          <div class="join">
            <button
              onclick={() => {
                if (quantity > cartStore.minQuantity) {
                  quantity--;
                }
              }}
              class="btn btn-secondary join-item aspect-square p-0"
            >
              <MinusIcon />
            </button>
            <input
              type="number"
              min="1"
              max={product.low_stock_remaining}
              bind:value={quantity}
              class="input join-item input-bordered input-secondary md:w-16"
            />
            <button
              onclick={() => quantity++}
              class="btn btn-primary join-item aspect-square p-0"
              disabled={quantity === product.low_stock_remaining}
            >
              <PlusIcon />
            </button>
          </div>
        {/if}
        <div class="my-3 flex w-full items-stretch gap-2">
          <button
            onclick={() => cartStore.addItem(product, quantity)}
            class="btn btn-secondary w-full rounded-xl"
            disabled={!product.is_in_stock || !!cartStore.cart.items.find(item => item.id === product.id)}
          >
            <CartIcon />
            Añadir al carrito
          </button>
          <!-- <button
          class="btn btn-primary w-1/2 rounded-xl p-2 md:w-auto"
          onclick={() => cartStore.checkout()}
        >
          <CheckoutIcon />
          Comprar ahora
        </button> -->
        </div>
      </div>
      <div>
        {#if product.description}
          <div class="prose-base mb-10">
            {@html product.description}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="flex gap-3 p-3">
    {#if product.categories && product.categories.length}
      <div>
        Catagorías:
        {#each product.categories as category}
          <a href={`/categories/${category.slug}`}>
            <span class="badge badge-outline mr-2">{category.slug}</span>
          </a>
        {/each}
      </div>
    {/if}
    {#if product.tags && product.tags.length}
      <div>
        Tags:
        {#each product.tags as tag}
          <a href={`/tag/${tag.slug}`}>
            <span class="badge badge-secondary badge-outline mr-2">{tag.slug}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
