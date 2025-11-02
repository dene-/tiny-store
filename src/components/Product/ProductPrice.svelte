<script lang="ts">
  import type { Product } from '@/interfaces/store.interfaces';
  import { formatPrice } from '@/lib/utils.lib';

  const { product }: { product: Product } = $props();
</script>

{#if product.prices.sale_price && product.prices.sale_price !== product.prices.regular_price}
  <div class="mb-5 flex items-baseline gap-3">
    <div class="text-base-content/60 line-through">
      {product.prices.currency_prefix}{formatPrice(product.prices.regular_price, product.prices)}{product.prices.currency_suffix}
    </div>
    <div class="text-primary text-3xl font-bold">
      {product.prices.currency_prefix}{formatPrice(product.prices.sale_price, product.prices)}{product.prices.currency_suffix}
    </div>
  </div>
{:else}
  <div class="text-primary mb-5 text-3xl font-bold">
    {product.prices.currency_prefix}{formatPrice(product.prices.price, product.prices)}{product.prices.currency_suffix}
  </div>
{/if}
