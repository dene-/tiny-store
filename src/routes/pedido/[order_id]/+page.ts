import { getOrder } from '@/routes/api/orders.remote';

export async function load({ params, url }) {
  const { order_id } = params;
  const { key, billing_email } = Object.fromEntries(url.searchParams.entries());

  const order = await getOrder({ order_id, key, billing_email });

  return {
    order,
  };
}
