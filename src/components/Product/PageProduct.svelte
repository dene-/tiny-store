<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import type { Product } from '@/interfaces/store.interfaces';
  import CartIcon from '../Icons/CartIcon.svelte';

  import MinusIcon from '../Icons/MinusIcon.svelte';
  import PlusIcon from '../Icons/PlusIcon.svelte';
  import ProductPrice from './ProductPrice.svelte';
  import ProductImage from './ProductImage.svelte';
  import OnSaleBadge from './OnSaleBadge.svelte';

  import { capitalizeFirstLetter } from '@/lib/utils.lib';

  const { product }: { product: Product } = $props();
  let quantity = $state(1);

  let isProductInCart = $derived(cartStore.cart.items.some(item => item.id === product.id));
</script>

<div class="mx-auto my-12 lg:my-24 lg:max-w-[900px]">
  <div class="breadcrumbs mb-6 pl-3 lg:pl-0">
    <ul>
      <li><a href="/">Inicio</a></li>
      {#if product.categories?.length}
        <li><a href={`/categoria/${product.categories[0].slug}`}>{capitalizeFirstLetter(product.categories[0].slug)}</a></li>
      {/if}
      <li>{product.name}</li>
    </ul>
  </div>
  <div class="flex flex-col items-stretch gap-6 lg:flex-row">
    <figure class="relative mb-6 min-w-1/2">
      <OnSaleBadge {product} />
      <ProductImage image={product.images[0]} />
    </figure>

    <div class="flex flex-grow flex-col p-3 pb-0">
      <div class="prose">
        <h1 class="product-title text-primary">
          {product.name}
        </h1>
      </div>
      <div>
        SKU: {product.sku ? product.sku : 'N/A'}
      </div>
      <div class="py-3 text-2xl">
        <ProductPrice {product} />
      </div>
      <div class="card-actions flex-col gap-3 lg:flex-row">
        {#if !product.sold_individually}
          <div class="join">
            <button
              onclick={() => quantity--}
              class="btn btn-secondary join-item aspect-square p-0"
              disabled={isProductInCart || quantity <= product.add_to_cart.minimum}
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
            />
            <button
              onclick={() => quantity++}
              class="btn btn-primary join-item aspect-square p-0"
              disabled={quantity >= product.add_to_cart.maximum || isProductInCart}
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
      <div>
        {#if product.description}
          <div class="prose-base mb-10">
            {@html product.description}
          </div>
        {/if}
      </div>
      <!-- Product in stock indicador -->
      {#if product.stock_availability && product.stock_availability.text}
        <div class="my-3 text-lg font-semibold">
          <span class={`badge badge-lg border-primary badge-${product.stock_availability.class}`}>
            {product.stock_availability.text}
          </span>
        </div>
      {/if}
    </div>
  </div>
  <div class="flex gap-3 p-3">
    {#if product.categories && product.categories.length}
      <div>
        Categorías:
        {#each product.categories as category}
          <a href={`/categoria/${category.slug}`}>
            <span class="badge badge-outline mr-2">{category.slug}</span>
          </a>
        {/each}
      </div>
    {/if}
    {#if product.tags && product.tags.length}
      <div>
        Tags:
        {#each product.tags as tag}
          <a href={`/etiqueta/${tag.slug}`}>
            <span class="badge badge-secondary badge-outline mr-2">{tag.slug}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
