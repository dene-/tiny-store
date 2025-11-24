import { query, getRequestEvent } from '$app/server';
import z from 'zod';
import { ENDPOINTS } from './config.const';

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

    const response = await fetch(`${ENDPOINTS.ORDERS}/${order_id}/?key=${key}&billing_email=${billing_email}`);

    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        message: 'Order not found',
      };
    }

    const order = (await response.json()) as Order;
    return order;
  } catch (err) {
    console.error('Error fetching order:', err);
    return {
      error: true,
      status: 500,
      message: 'Internal Server Error',
    };
  }
});
