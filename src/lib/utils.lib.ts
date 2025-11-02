import type { Prices } from '@/interfaces/store.interfaces';

export const formatPrice = (price: string, prices: Prices) => {
  const { currency_minor_unit, currency_decimal_separator } = prices;

  // Split price string, by the end with the current_minor_unit value
  let slicedPriceFirst = price.slice(0, price.length - currency_minor_unit);
  let slicedPriceLast = price.slice(-currency_minor_unit);

  // Join the sliced parts with the decimal separator
  let formattedPrice = slicedPriceFirst + currency_decimal_separator + slicedPriceLast;

  return formattedPrice;
};
