import type { PaymentGateway, PublicPaymentGateway } from '@/interfaces/store.interfaces';

export const toPublicPaymentGateways = <Gateway extends Pick<PaymentGateway, 'id' | 'title' | 'description' | 'enabled'>>(
  paymentGateways: Gateway[],
): PublicPaymentGateway[] =>
  paymentGateways
    .filter(gateway => gateway.enabled)
    .map(({ id, title, description }) => ({
      id,
      title,
      description,
    }));
