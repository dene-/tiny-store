<script lang="ts">
  import type { Order } from '@/interfaces/store.interfaces';
  import ProductTable from '@/components/Product/ProductTable.svelte';
  import { page } from '$app/state';

  interface OrderResponse {
    order: Order;
  }

  const { data }: { data: OrderResponse } = $props();

  const STATUSES: Record<string, string> = {
    pending: 'Pendiente de pago',
    processing: 'Procesando',
    'on-hold': 'En espera',
    completed: 'Completado',
    cancelled: 'Cancelado',
    refunded: 'Reembolsado',
    failed: 'Fallido',
    'checkout-draft': 'Borrador de pago',
  };
</script>

<svelte:head>
  <title>Pedido recibido | Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado."
  />
  <meta
    name="robots"
    content="noindex"
  />
</svelte:head>

<div class="order mx-auto my-12 lg:my-24 lg:max-w-[800px]">
  <div class="flex flex-col gap-12 p-3 lg:flex-row">
    <div class="flex-grow">
      <h1 class="mb-3 flex items-center gap-3 text-2xl font-bold">
        <span class="text-primary">✅</span>
        Pedido recibido
      </h1>
      <p class="mb-6 text-lg">
        ¡Gracias por tu compra! Tu pedido ha sido recibido y está siendo procesado. Guarda este <a
          href={page.url.href}
          class="font-bold underline">enlace</a
        > para poder acceder a los datos del pedido y el estado.
      </p>
      <div class="mt-6">
        <h2 class="mb-6 text-xl font-bold">Estado del pedido</h2>
        <p class="text-lg font-semibold">- {STATUSES[data.order.status]} -</p>
      </div>
      <div class="mt-6">
        <h2 class="mb-6 text-xl font-bold">Detalles del pedido</h2>
        <ProductTable
          items={data.order.items}
          showTotal={true}
          totals={data.order.totals}
        />
      </div>
      <div class="mt-6">
        <h2 class="mb-6 text-xl font-bold">Datos facturación</h2>
        <div class="flex flex-col gap-3">
          <div><span class="font-bold">Nombre:</span> {data.order.billing_address.first_name} {data.order.billing_address.last_name}</div>
          <div><span class="font-bold">Email:</span> {data.order.billing_address.email}</div>
          <div><span class="font-bold">Teléfono:</span> {data.order.billing_address.phone}</div>
          <div>
            <span class="font-bold">Dirección:</span>
            {data.order.billing_address.address_1?.replace('&#8211;', '-')}, {data.order.billing_address.city}, {data.order.billing_address.postcode}, España
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
