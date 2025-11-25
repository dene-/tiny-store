<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Product } from '@/interfaces/store.interfaces';
  import OnSaleBadge from './OnSaleBadge.svelte';

  const { product }: { product: Product } = $props();

  $inspect(product);
</script>

<div class="border-base-300 relative row-span-4 grid flex-shrink-0 grid-rows-subgrid gap-0 border bg-white transition will-change-auto hover:scale-[101%]">
  <OnSaleBadge {product} />
  <figure>
    <a href={`/producto/${product.slug}`}>
      <img
        src={product.images[0].src}
        alt={product.images[0].alt}
        title={product.images[0].alt}
        srcset={product.images[0].srcset}
        sizes={product.images[0].sizes}
        loading="lazy"
      />
    </a>
  </figure>

  <h1 class="product-title card-title items-center justify-center p-3 text-center text-sm lg:text-xl">
    {product.name}
  </h1>
  <!-- {#if product.short_description}
        <p class="text-center text-xs lg:text-sm">
          {product.short_description}
        </p>
      {/if} -->
  <div class="card-actions justify-center p-3">
    <!-- <div class="text-primary text-3xl font-bold">
          {item.price} €
        </div> -->
    <div class="text-center">
      <button
        onclick={() => goto(`/producto/${product.slug}`)}
        class="btn btn-primary w-full rounded-xl text-xs uppercase lg:text-sm"
      >
        Ver producto
      </button>
    </div>
  </div>
</div>
