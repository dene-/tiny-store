<script lang="ts">
  import { onMount } from 'svelte';
  import { getPaymentGateways } from '@/routes/api/checkout.remote';
  import type { PaymentGateway } from '@/interfaces/store.interfaces';

  import FormGenerator from '@/components/Form/FormGenerator.svelte';
  import type { InputField } from '@/interfaces/forms.interfaces';

  let paymentMethods: PaymentGateway[] = await getPaymentGateways();
  let selectedPaymentMethod: string = $state(paymentMethods[0].id);

  let paymentBillingFields: InputField[] = $derived([
    {
      id: 'billing_first_name',
      label: 'Nombre y apellidos',
      type: 'text',
      name: 'name',
      required: true,
      fullWidth: true,
      placeholder: 'Nombre y apellidos',
    },
    {
      id: 'billing_address_1',
      label: 'Dirección',
      type: 'text',
      name: 'street-address',
      required: true,
      fullWidth: true,
      placeholder: 'Dirección',
    },
    {
      id: 'billing_country',
      label: 'País',
      type: 'text',
      name: 'country',
      required: true,
      value: 'España',
      fullWidth: true,
      placeholder: 'País',
    },
    {
      id: 'billing_city',
      label: 'Ciudad',
      type: 'text',
      name: 'city',
      required: true,
      placeholder: 'Ciudad',
    },
    {
      id: 'billing_postcode',
      label: 'Código Postal',
      type: 'text',
      name: 'postcode',
      required: true,
      placeholder: 'Código postal',
    },
    {
      id: 'billing_email',
      label: 'Correo Electrónico',
      type: 'email',
      name: 'email',
      required: true,
      fullWidth: true,
      placeholder: 'Correo electrónico',
    },
    {
      id: 'billing_phone',
      label: 'Teléfono',
      type: 'tel',
      name: 'phone',
      required: true,
      fullWidth: true,
      placeholder: 'Número de teléfono',
    },
  ]);

  let billingForm = $state({
    billing_first_name: '',
    billing_last_name: '',
    billing_address_1: '',
    billing_country: 'España',
    billing_city: '',
    billing_postcode: '',
    billing_email: '',
    billing_phone: '',
  });

  function handleFormSubmit(formData: Record<string, any>) {
    console.log('Billing Details:', billingForm);
    console.log('Selected Payment Method:', selectedPaymentMethod);
    // Aquí puedes agregar la lógica para procesar el pago y enviar los datos al servidor
  }
</script>

<svelte:head>
  <title>Finalizar compra | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Completa tu compra en Mami Crafts. Selecciona tu método de pago y proporciona tus detalles de facturación para finalizar tu pedido."
  />
</svelte:head>

<div class="checkout mx-auto my-12 lg:my-24 lg:max-w-[800px]">
  <div class="flex flex-col gap-12 p-3 lg:flex-row">
    <div class="flex-grow">
      <h1 class="mb-3 text-2xl font-bold">Finalizar compra</h1>

      <div class="card bg-base-200 rounded-lg p-3">
        <h2 class="mb-6 text-xl font-bold">Opciones de pago</h2>
        <div class="flex flex-col gap-3">
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
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  </div>
</div>
