<script lang="ts">
  import type { Cart, CartItem, CartTotals, OrderTotals, Product } from '@/interfaces/store.interfaces';
  import { formatPrice } from '@/lib/utils.lib';

  const {
    product,
    totals,
    showOfferBadge = true,
    showLineThroughPrice = true,
    isTotalPrice = false,
  }: {
    product?: Product | CartItem;
    totals?: CartTotals | OrderTotals;
    showOfferBadge?: boolean;
    showLineThroughPrice?: boolean;
    isTotalPrice?: boolean;
  } = $props();
</script>

{#if product && product.prices.sale_price && product.prices.sale_price !== product.prices.regular_price}
  <div class="flex flex-col items-end gap-1 lg:flex-row lg:items-center">
    {#if showOfferBadge}
      <span class="badge badge-primary hidden font-semibold whitespace-nowrap lg:block">
        Ahorra {product.prices.currency_prefix}{formatPrice(
          (parseInt(product.prices.regular_price) - parseInt(product.prices.sale_price)).toString(),
          product.prices,
        )}{product.prices.currency_suffix}
      </span>
    {/if}
    {#if showLineThroughPrice}
      <div class="text-base-content/60 whitespace-nowrap line-through">
        {product.prices.currency_prefix}{formatPrice(product.prices.regular_price, product.prices)}{product.prices.currency_suffix}
      </div>
    {/if}
    <div class="text-primary font-bold whitespace-nowrap">
      {product.prices.currency_prefix}{formatPrice(product.prices.sale_price, product.prices)}{product.prices.currency_suffix}
    </div>
  </div>
{:else if product}
  <div class="text-primary font-bold whitespace-nowrap">
    {product.prices.currency_prefix}{formatPrice(product.prices.price, product.prices)}{product.prices.currency_suffix}
  </div>
{:else if isTotalPrice && totals}
  <div class="text-primary font-bold whitespace-nowrap">
    {totals.currency_prefix}{formatPrice(totals.total_price, totals)}{totals.currency_suffix}
  </div>
{/if}
