import { query, getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { ENDPOINTS } from './config.const';
import { buildEndpoint, fetchJson, rethrowHttpOrFail } from './remote-utils';

import type { Order } from '@/interfaces/store.interfaces';

const getOrderSchema = z.object({
  order_id: z.string().min(1),
  key: z.string().optional(),
  billing_email: z.string().email().optional(),
});
type GetOrderParams = z.infer<typeof getOrderSchema>;

export const getOrder = query(getOrderSchema, async ({ order_id, key, billing_email }: GetOrderParams) => {
  try {
    const { fetch } = getRequestEvent();

    const order = await fetchJson<Order>(
      fetch,
      buildEndpoint(`${ENDPOINTS.ORDERS}/${order_id}`, {
        key,
        billing_email,
      }),
    );

    if (!order) {
      error(404, 'Order not found');
    }

    return order;
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch order');
  }
});
