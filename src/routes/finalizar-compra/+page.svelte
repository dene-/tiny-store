<script lang="ts">
  import { goto } from '$app/navigation';

  import { getPaymentGateways } from '@/routes/api/checkout.remote';
  import { checkoutOrder } from '@/routes/api/checkout.remote';

  import type { PaymentGateway } from '@/interfaces/store.interfaces';
  import type { InputField } from '@/interfaces/forms.interfaces';

  import { cartStore } from '@/stores/cartStore.store.svelte';

  import type { CheckoutStatusBillingAddress } from '@/interfaces/store.interfaces';

  import FormGenerator from '@/components/Form/FormGenerator.svelte';
  import CheckoutIcon from '@/components/Icons/CheckoutIcon.svelte';
  import ProductTable from '@/components/Product/ProductTable.svelte';

  let paymentMethods: PaymentGateway[] = $state(await getPaymentGateways());
  let selectedPaymentMethod: string = $state(paymentMethods[0].id);

  let isProcessingOrder = $state(false);

  let billingForm = $state({
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

  let paymentBillingFields: InputField[] = $derived([
    {
      id: 'first_name',
      label: 'Nombre',
      type: 'text',
      name: 'name',
      required: true,
      fullWidth: false,
      value: billingForm.first_name,
      placeholder: 'Nombre',
      ariaLabel: 'Nombre',
    },
    {
      id: 'last_name',
      label: 'Apellidos',
      type: 'text',
      name: 'last-name',
      required: true,
      fullWidth: false,
      value: billingForm.last_name,
      placeholder: 'Apellidos',
      ariaLabel: 'Apellidos',
    },
    {
      id: 'address_1',
      label: 'Dirección',
      type: 'text',
      name: 'street-address',
      required: true,
      fullWidth: true,
      value: billingForm.address_1,
      placeholder: 'Dirección',
      ariaLabel: 'Dirección',
    },
    {
      id: 'country',
      label: 'País',
      type: 'select',
      name: 'country',
      options: [{ value: 'ES', label: 'España', selected: true }],
      required: true,
      value: billingForm.country,
      placeholder: 'País',
      ariaLabel: 'País',
    },
    {
      id: 'city',
      label: 'Ciudad',
      type: 'text',
      name: 'city',
      required: true,
      value: billingForm.city,
      placeholder: 'Ciudad',
      ariaLabel: 'Ciudad',
    },
    {
      id: 'state',
      label: 'Provincia',
      type: 'text',
      name: 'state',
      required: true,
      value: billingForm.state,
      placeholder: 'Provincia',
      ariaLabel: 'Provincia',
    },
    {
      id: 'postcode',
      label: 'Código Postal',
      type: 'text',
      name: 'postcode',
      required: true,
      value: billingForm.postcode,
      placeholder: 'Código postal',
      ariaLabel: 'Código Postal',
    },
    {
      id: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      name: 'email',
      required: true,
      value: billingForm.email,
      placeholder: 'Correo electrónico',
      ariaLabel: 'Correo Electrónico',
    },
    {
      id: 'phone',
      label: 'Teléfono',
      type: 'tel',
      name: 'phone',
      required: true,
      value: billingForm.phone,
      placeholder: 'Número de teléfono',
      ariaLabel: 'Teléfono',
    },
  ]);

  async function handleFormSubmit(formData: Record<string, any>) {
    const billing_address = formData as CheckoutStatusBillingAddress;

    isProcessingOrder = true;

    const checkoutResponse = await checkoutOrder({
      cart_token: cartStore.cartToken,
      payment_method: selectedPaymentMethod,
      create_account: false,
      billing_address,
    });

    cartStore.getCart();

    await goto(`/pedido/${checkoutResponse.order_id}/?key=${checkoutResponse.order_key}&billing_email=${billing_address.email}`);

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
        <!-- content here -->
        <h1 class="mb-3 flex items-center gap-3 text-2xl font-bold">
          <span class="text-primary"><CheckoutIcon /></span>
          Finalizar compra
        </h1>
        <div class="mt-6">
          <h2 class="mb-6 text-xl font-bold">Resumen pedido</h2>
          <ProductTable
            items={cartStore.cart.items}
            showTotal={true}
            totals={cartStore.cart.totals}
          />
        </div>
        <div class="card bg-base-200 mt-6 rounded-lg p-3">
          <h2
            class="mb-6 text-xl font-bold"
            id="payment-options-heading"
          >
            Opciones de pago
          </h2>
          <div
            class="flex flex-col gap-3"
            role="radiogroup"
            aria-labelledby="payment-options-heading"
          >
            {#each paymentMethods as method (method.id)}
              <div class="flex items-center gap-3 rounded-lg border bg-white p-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  bind:group={selectedPaymentMethod}
                  value={method.id}
                  id={method.id}
                  class="radio radio-primary"
                />
                <label
                  for={method.id}
                  class="flex flex-col"
                >
                  <span class="text-lg font-semibold">{method.title}</span>
                  {#if selectedPaymentMethod === method.id}
                    <span class="text-sm">{method.description}</span>
                  {/if}
                </label>
              </div>
            {/each}
          </div>
        </div>
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
        <p
          class="text-center text-lg font-medium"
          role="alert"
        >
          Tu carrito está vacío. Vuelve a <a
            href="/"
            class="text-primary font-bold"
            aria-label="Volver a la tienda">la tienda</a
          >.
        </p>
      {/if}
    </div>
  </div>
</div>
