import { query, getRequestEvent } from '$app/server';
import z from 'zod';

import { ENDPOINTS, oauth } from './config.const';

import type { CheckoutStatus, PaymentGatewaysResponse, CheckoutOrderResponse } from '@/interfaces/store.interfaces';

export const getCheckoutStatus = query(z.string().optional(), async (cartToken?: string) => {
  const { fetch } = getRequestEvent();

  const headers = new Headers();

  if (cartToken) {
    headers.append('Cart-Token', cartToken);
  }

  try {
    const res = await fetch(`${ENDPOINTS.CHECKOUT}`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      console.error('Error fetching checkout status:', res.statusText);
      return {} as CheckoutStatus;
    }

    const data = (await res.json()) as CheckoutStatus;

    return data;
  } catch (err) {
    console.error(err);

    return {} as CheckoutStatus;
  }
});

export const getPaymentGateways = query(async () => {
  try {
    const { fetch } = getRequestEvent();

    // Generate OAuth params
    const oauthParams = oauth.authorize({
      url: ENDPOINTS.PAYMENT_GATEWAYS,
      method: 'GET',
    });

    // Create the Authorization header
    const authHeader = oauth.toHeader(oauthParams);

    const res = await fetch(`${ENDPOINTS.PAYMENT_GATEWAYS}`, {
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Error fetching payment methods:', res.statusText);
      return [];
    }

    let data = (await res.json()) as PaymentGatewaysResponse;

    data = data.filter(gateway => gateway.enabled);

    return data;
  } catch (err) {
    console.error(err);

    return [];
  }
});

const AddressSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  address_1: z.string().optional(),
  address_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
});

const BillingAddressSchema = AddressSchema.extend({
  email: z.string().optional(),
  phone: z.string().optional(),
});

const CheckoutSchema = z.object({
  billing_address: BillingAddressSchema,
  shipping_address: AddressSchema.optional(),
  payment_method: z.string(),
  customer_note: z.string().optional().default(''),
  create_account: z.boolean().optional(),
  cart_token: z.string(),
  payment_data: z.array(z.any()).optional().default([]),
  customer_password: z.string().optional().default(''),
});

type CheckoutParams = z.infer<typeof CheckoutSchema>;

export const checkoutOrder = query(CheckoutSchema, async (checkoutData: CheckoutParams) => {
  try {
    const { fetch } = getRequestEvent();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (checkoutData.cart_token) {
      headers.append('Cart-Token', checkoutData.cart_token);
    }

    const response = await fetch(`${ENDPOINTS.CHECKOUT}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      console.error('Error during checkout:', response.statusText);
      return {} as CheckoutOrderResponse;
    }

    const data = (await response.json()) as CheckoutOrderResponse;
    return data;
  } catch (err) {
    console.error('Error during checkout:', err);
    return {} as CheckoutOrderResponse;
  }
});
