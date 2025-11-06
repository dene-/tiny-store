<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';

  import LogoutIcon from '@/components/Icons/LogoutIcon.svelte';
  import UserIcon from '@/components/Icons/UserIcon.svelte';
  import OrdersIcon from '@/components/Icons/OrdersIcon.svelte';
  import AddressIcon from '@/components/Icons/AddressIcon.svelte';
  import ProductsIcon from '@/components/Icons/ProductsIcon.svelte';

  import { account } from '@/lib/appwrite.lib';

  let ViewComponent: Component | null = $state(null);

  async function changeViewComponent(tabView: string) {
    switch (tabView) {
      case 'user':
        ViewComponent = (await import('@/components/Settings/UserSettingsComponent.svelte')).default;
        break;
      case 'orders':
        ViewComponent = (await import('@/components/Settings/UserOrdersComponent.svelte')).default;
        break;
      case 'shippingAddress':
        ViewComponent = (await import('@/components/Settings/ShippingAddressComponent.svelte')).default;
        break;
      case 'products':
        ViewComponent = (await import('@/components/Settings/ProductsComponent.svelte')).default;
        break;
    }
  }

  onMount(async () => {
    sessionStore.user = await account.get();
    console.log(sessionStore.user);
    changeViewComponent('user');
  });
</script>

<div class="account-page p-3">
  {#if sessionStore.user}
    <div class="mt-3 flex w-full flex-col gap-6 lg:flex-row">
      <div class="sidemenu flex-shrink-0 flex-grow lg:flex-grow-0">
        <ul class="menu rounded-box bg-base-200 w-full flex-row flex-nowrap gap-3 overflow-x-auto lg:w-56 lg:flex-col">
          <li>
            <button onclick={() => changeViewComponent('user')}>
              <UserIcon />
              Usuario
            </button>
          </li>
          <li>
            <button onclick={() => changeViewComponent('orders')}>
              <OrdersIcon />
              Pedidos
            </button>
          </li>
          <li>
            <button onclick={() => changeViewComponent('shippingAddress')}>
              <AddressIcon />
              Direcciones de envío
            </button>
          </li>
          {#if sessionStore.user.labels.includes('admin')}
            <li>
              <button onclick={() => changeViewComponent('products')}>
                <ProductsIcon />
                Productos
              </button>
            </li>
          {/if}
          <li>
            <button
              class="text-gray-500"
              onclick={() => sessionStore.logout()}
            >
              <LogoutIcon />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
      <div class="flex-grow">
        <ViewComponent />
      </div>
    </div>
  {:else if sessionStore.hasSessionLoaded}
    <div class="flex flex-col items-center gap-3">
      <h1 class="text-2xl font-bold">Bienvenido, Invitado</h1>
      <div class="text-lg">
        Por favor
        <button
          class="btn btn-primary mx-3"
          onclick={() => loginModalStore.open()}
        >
          iniciar sesión
        </button>
        para ver los detalles de tu cuenta.
      </div>
    </div>
  {:else if !sessionStore.hasSessionLoaded}
    <div class="flex h-[50vh] items-center justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {/if}
</div>
