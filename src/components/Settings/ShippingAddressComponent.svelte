<script lang="ts">
  import FormGenerator from '../Form/FormGenerator.svelte';
  import type { InputField } from '@/interfaces/forms.interfaces';
  import { countries } from '@/constants/countries.const';

  import { sessionStore } from '@/stores/sessionStore.store.svelte';

  const shippingAddressFormFields: InputField[] = [
    {
      id: 'full-name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Full name',
    },
    {
      id: 'phone-number',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Phone,  e.g. +123 4567890',
    },
    {
      id: 'address-1',
      label: 'Address 1',
      type: 'text',
      required: true,
      placeholder: 'Address',
      fullWidth: true,
    },
    {
      id: 'address-2',
      label: 'Address 2',
      type: 'text',
      required: true,
      placeholder: 'Address',
      fullWidth: true,
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      required: true,
      placeholder: 'City',
    },
    {
      id: 'postal-code',
      label: 'Postal Code',
      type: 'text',
      required: true,
      placeholder: 'Postal code',
    },
    {
      id: 'state',
      label: 'State (if USA)',
      type: 'text',
      required: false,
      placeholder: 'State',
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      options: countries.map(country => ({
        value: country.code,
        label: country.name,
      })),
      required: true,
      placeholder: 'Enter your country',
    },
  ];

  function handleFormSubmit(formData: Record<string, any>) {
    console.log('Form submitted:', formData.name);
    // Handle form submission
  }
</script>

{#if sessionStore.user}
  {#if !sessionStore.user.prefs.shippingAddress}
    <h1 class="text-2xl font-bold">Shipping Address</h1>
    <p class="text-sm text-gray-500">You don't have saved any shipping address, add your first one:</p>
    <FormGenerator
      formName="shipping-address-form"
      buttonText="Save"
      fields={shippingAddressFormFields}
      onSubmit={handleFormSubmit}
    />
  {:else}
    <h1 class="text-2xl font-bold">Shipping Address</h1>
    <p class="text-sm text-gray-500">Add your shipping address below.</p>
  {/if}
{:else}
  <p>Please log in to view this page.</p>
{/if}
