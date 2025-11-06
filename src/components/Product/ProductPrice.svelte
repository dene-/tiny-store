<script lang="ts">
  import type { CartItem, Product } from '@/interfaces/store.interfaces';
  import { formatPrice } from '@/lib/utils.lib';

  const { product }: { product: Product | CartItem } = $props();
</script>

{#if product.prices.sale_price && product.prices.sale_price !== product.prices.regular_price}
  <div class="flex flex-col items-end gap-1 lg:flex-row lg:items-center">
    <span class="badge badge-primary">
      ¡Ahorra {product.prices.currency_prefix}{formatPrice(
        (parseInt(product.prices.regular_price) - parseInt(product.prices.sale_price)).toString(),
        product.prices,
      )}{product.prices.currency_suffix}!
    </span>
    <div class="text-base-content/60 line-through">
      {product.prices.currency_prefix}{formatPrice(product.prices.regular_price, product.prices)}{product.prices.currency_suffix}
    </div>
    <div class="text-primary font-bold">
      {product.prices.currency_prefix}{formatPrice(product.prices.sale_price, product.prices)}{product.prices.currency_suffix}
    </div>
  </div>
{:else}
  <div class="text-primary font-bold">
    {product.prices.currency_prefix}{formatPrice(product.prices.price, product.prices)}{product.prices.currency_suffix}
  </div>
{/if}
