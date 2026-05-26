<script lang="ts">
  import type { Product } from '@/interfaces/store.interfaces';
  import ProductPrice from './ProductPrice.svelte';
  import ProductImage from './ProductImage.svelte';
  import OnSaleBadge from './OnSaleBadge.svelte';
  import { sanitizeProductText } from '@/lib/html-sanitizer';
  import ProductBreadcrumbs from './ProductBreadcrumbs.svelte';
  import ProductPurchaseControls from './ProductPurchaseControls.svelte';
  import ProductRecommendations from './ProductRecommendations.svelte';
  import ProductTaxonomyLinks from './ProductTaxonomyLinks.svelte';

  const { product }: { product: Product } = $props();
  let productDescription = $derived(sanitizeProductText(product.description || ''));
</script>

<div class="mx-auto my-12 lg:my-24 lg:max-w-[900px]">
  <ProductBreadcrumbs {product} />
  <div class="flex flex-col items-stretch gap-6 lg:flex-row">
    <figure class="relative mb-6 min-w-1/2">
      <OnSaleBadge {product} />
      <ProductImage images={product.images} />
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
      <ProductPurchaseControls {product} />
      <div>
        {#if productDescription}
          <p class="prose-base mb-10 whitespace-pre-line">
            {productDescription}
          </p>
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
  <ProductTaxonomyLinks {product} />
  <ProductRecommendations
    {product}
    type="upsell"
  />
  <ProductRecommendations
    {product}
    type="related"
  />
</div>
