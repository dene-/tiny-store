import { command, query, getRequestEvent } from '$app/server';
import z from 'zod';

import { ENDPOINTS, oauth } from './config.const';
import { toPublicPaymentGateways } from './payment-gateways';
import { createCartHeaders, failRemote, fetchJson, rethrowHttpOrFail } from './remote-utils';

import type { CheckoutStatus, CheckoutOrderResponse, PaymentGatewaysResponse } from '@/interfaces/store.interfaces';

export const getCheckoutStatus = query(z.string().optional(), async (cartToken?: string) => {
  const { fetch } = getRequestEvent();

  try {
    const data = await fetchJson<CheckoutStatus>(fetch, ENDPOINTS.CHECKOUT, {
      method: 'GET',
      headers: createCartHeaders(cartToken),
    });

    if (!data) {
      failRemote('Unable to fetch checkout status');
    }

    return data;
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch checkout status');
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

    const data = await fetchJson<PaymentGatewaysResponse>(fetch, ENDPOINTS.PAYMENT_GATEWAYS, {
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!data) {
      failRemote('Unable to fetch payment methods');
    }

    return toPublicPaymentGateways(data);
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to fetch payment methods');
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
  payment_data: z.array(z.unknown()).optional().default([]),
  customer_password: z.string().optional().default(''),
});

type CheckoutParams = z.infer<typeof CheckoutSchema>;

export const checkoutOrder = command(CheckoutSchema, async (checkoutData: CheckoutParams) => {
  try {
    const { fetch } = getRequestEvent();

    const data = await fetchJson<CheckoutOrderResponse>(fetch, ENDPOINTS.CHECKOUT, {
      method: 'POST',
      headers: createCartHeaders(checkoutData.cart_token, {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(checkoutData),
    });

    if (!data) {
      failRemote('Unable to complete checkout');
    }

    return data;
  } catch (err) {
    rethrowHttpOrFail(err, 'Unable to complete checkout');
  }
});
