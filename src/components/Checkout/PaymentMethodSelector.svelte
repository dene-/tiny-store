<script lang="ts">
  import type { PublicPaymentGateway } from '@/interfaces/store.interfaces';

  interface Props {
    paymentMethods: PublicPaymentGateway[];
    selectedPaymentMethod: string;
  }

  let { paymentMethods, selectedPaymentMethod = $bindable() }: Props = $props();
</script>

<div class="card bg-base-200 mt-6 rounded-lg p-3">
  <h2
    class="mb-6 text-xl font-bold"
    id="payment-options-heading"
  >
    Opciones de pago
  </h2>
  {#if paymentMethods.length}
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
  {:else}
    <p
      class="text-sm"
      role="alert"
    >
      No hay métodos de pago disponibles.
    </p>
  {/if}
</div>
