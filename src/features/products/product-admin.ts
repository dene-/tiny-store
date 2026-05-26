export function formatProductPrice(price: string | undefined) {
  const cents = Number(price ?? 0);

  return (cents / 100).toFixed(2);
}
