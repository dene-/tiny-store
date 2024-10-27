<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';

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
    changeViewComponent('user');
  });
</script>

<div class="account-page p-3">
  {#if sessionStore.user}
    <div class="mt-3 flex w-full gap-6">
      <div class="sidemenu">
        <ul class="menu w-56 gap-3 rounded-box bg-base-200">
          <li>
            <button onclick={() => changeViewComponent('user')}>User</button>
          </li>
          <li>
            <button onclick={() => changeViewComponent('orders')}>Orders</button>
          </li>
          <li>
            <button onclick={() => changeViewComponent('shippingAddress')}>Shipping address</button>
          </li>
          <li>
            <button onclick={() => changeViewComponent('products')}>Products</button>
          </li>
          <li>
            <button onclick={() => sessionStore.logout()}>Log out</button>
          </li>
        </ul>
      </div>
      <div class="flex flex-grow flex-col items-center gap-1 p-3 pt-0">
        <ViewComponent />
      </div>
    </div>
  {:else if sessionStore.hasSessionLoaded}
    <div class="flex flex-col items-center gap-3">
      <h1 class="text-2xl font-bold">Welcome, Guest</h1>
      <div class="text-lg">
        Please
        <button
          class="btn btn-primary mx-3"
          onclick={() => loginModalStore.open()}
        >
          log in
        </button>
        to view your account details.
      </div>
    </div>
  {:else if !sessionStore.hasSessionLoaded}
    <div class="flex h-[50vh] items-center justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {/if}
</div>
