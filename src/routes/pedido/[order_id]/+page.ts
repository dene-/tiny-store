import { getOrder } from '@/routes/api/orders.remote';

export async function load({ params, url }) {
  const { order_id } = params;
  const { key, billing_email } = Object.fromEntries(url.searchParams.entries());

  console.log('Order ID:', order_id);
  console.log('Key:', key);
  console.log('Billing Email:', billing_email);

  const order = await getOrder({ order_id, key, billing_email });

  return {
    order,
  };
}
