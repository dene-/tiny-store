<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Product } from '@/interfaces/store.interfaces';

  const { product }: { product: Product } = $props();
</script>

<div class="card border-base-300 relative flex-shrink-0 border bg-white">
  {#if product.on_sale}
    <div class="bg-primary absolute top-2 right-2 z-1 rounded-lg p-2 font-bold text-white select-none">¡EN OFERTA!</div>
  {/if}
  <figure>
    <a href={`/producto/${product.slug}`}>
      <img
        src={product.images[0].src}
        alt={product.images[0].alt}
        title={product.images[0].alt}
      />
    </a>
  </figure>

  <div class="card-body p-4">
    <h1 class="product-title card-title justify-center text-sm lg:text-xl">
      {product.name}
    </h1>
    <!-- {#if product.short_description}
      <p class="text-center text-xs lg:text-sm">
        {product.short_description}
      </p>
    {/if} -->
    <div class="card-actions justify-center">
      <!-- <div class="text-primary text-3xl font-bold">
        {item.price} €
      </div> -->
      <div class="text-center">
        <button
          onclick={() => goto(`/producto/${product.slug}`)}
          class="btn btn-primary mt-3 w-full rounded-xl text-xs uppercase lg:text-sm"
        >
          Ver producto
        </button>
      </div>
    </div>
  </div>
</div>
