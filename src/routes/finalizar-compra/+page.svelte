<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  import { getPaymentGateways } from '@/routes/api/checkout.remote';
  import { checkoutOrder } from '@/routes/api/checkout.remote';

  import type { PublicPaymentGateway } from '@/interfaces/store.interfaces';
  import type { FormDataRecord } from '@/interfaces/forms.interfaces';

  import { cartStore } from '@/stores/cartStore.store.svelte';

  import type { CheckoutStatusBillingAddress } from '@/interfaces/store.interfaces';

  import FormGenerator from '@/components/Form/FormGenerator.svelte';
  import CheckoutIcon from '@/components/Icons/CheckoutIcon.svelte';
  import CheckoutSummary from '@/components/Checkout/CheckoutSummary.svelte';
  import EmptyCartState from '@/components/Checkout/EmptyCartState.svelte';
  import PaymentMethodSelector from '@/components/Checkout/PaymentMethodSelector.svelte';
  import { toBillingAddress } from '@/features/checkout/checkout-form.mapper';
  import { createBillingFields } from './checkout-fields';

  let paymentMethods: PublicPaymentGateway[] = $state(await getPaymentGateways());
  let selectedPaymentMethod: string = $state(paymentMethods[0]?.id || '');

  let isProcessingOrder = $state(false);

  let billingForm: CheckoutStatusBillingAddress = $state({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    country: 'ES',
    city: '',
    state: '',
    postcode: '',
    email: '',
    phone: '',
  });

  let paymentBillingFields = $derived(createBillingFields(billingForm));

  async function handleFormSubmit(formData: FormDataRecord) {
    const billing_address = toBillingAddress(formData);

    if (!selectedPaymentMethod) {
      return;
    }

    isProcessingOrder = true;

    const checkoutResponse = await checkoutOrder({
      cart_token: cartStore.cartToken,
      payment_method: selectedPaymentMethod,
      create_account: false,
      billing_address,
    });

    cartStore.getCart();

    await goto(resolve(`/pedido/${checkoutResponse.order_id}/?key=${checkoutResponse.order_key}&billing_email=${billing_address.email}`));

    isProcessingOrder = false;
  }
</script>

<svelte:head>
  <title>Finalizar compra | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Completa tu compra en Mami Crafts. Selecciona tu método de pago y proporciona tus detalles de facturación para finalizar tu pedido."
  />
  <meta
    name="robots"
    content="noindex"
  />
</svelte:head>

<div class="checkout mx-auto my-12 lg:my-24 lg:max-w-[800px]">
  <div class="flex flex-col gap-12 p-3 lg:flex-row">
    <div class="flex-grow">
      {#if cartStore.cart.items.length}
        <h1 class="mb-3 flex items-center gap-3 text-2xl font-bold">
          <span class="text-primary"><CheckoutIcon /></span>
          Finalizar compra
        </h1>
        <CheckoutSummary
          items={cartStore.cart.items}
          totals={cartStore.cart.totals}
        />
        <PaymentMethodSelector
          {paymentMethods}
          bind:selectedPaymentMethod
        />
        <div class="mt-6">
          <h2 class="mb-6 text-xl font-bold">Detalles de facturación</h2>
          <FormGenerator
            formName="user-form"
            buttonText="Realizar pedido"
            fields={paymentBillingFields}
            isProcessing={isProcessingOrder}
            onSubmit={handleFormSubmit}
          />
        </div>
      {:else}
        <EmptyCartState />
      {/if}
    </div>
  </div>
</div>
