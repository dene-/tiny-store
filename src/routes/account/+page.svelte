<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';
  import { visibleAccountTabs } from '@/features/account/account-navigation';

  import AccountGuestPrompt from '@/components/Account/AccountGuestPrompt.svelte';
  import AccountLoadingState from '@/components/Account/AccountLoadingState.svelte';
  import AccountSideMenu from '@/components/Account/AccountSideMenu.svelte';
  import UserIcon from '@/components/Icons/UserIcon.svelte';
  import OrdersIcon from '@/components/Icons/OrdersIcon.svelte';
  import AddressIcon from '@/components/Icons/AddressIcon.svelte';
  import ProductsIcon from '@/components/Icons/ProductsIcon.svelte';
  import UserSettingsComponent from '@/components/Settings/UserSettingsComponent.svelte';

  type AccountTabId = 'user' | 'orders' | 'shippingAddress' | 'products';
  type AccountTab = {
    id: AccountTabId;
    label: string;
    icon: Component;
    adminOnly?: boolean;
    loadComponent: () => Promise<Component>;
  };

  const tabs: AccountTab[] = [
    {
      id: 'user',
      label: 'Usuario',
      icon: UserIcon,
      loadComponent: async () => UserSettingsComponent,
    },
    {
      id: 'orders',
      label: 'Pedidos',
      icon: OrdersIcon,
      loadComponent: async () => (await import('@/components/Settings/UserOrdersComponent.svelte')).default,
    },
    {
      id: 'shippingAddress',
      label: 'Direcciones de envío',
      icon: AddressIcon,
      loadComponent: async () => (await import('@/components/Settings/ShippingAddressComponent.svelte')).default,
    },
    {
      id: 'products',
      label: 'Productos',
      icon: ProductsIcon,
      adminOnly: true,
      loadComponent: async () => (await import('@/components/Settings/ProductsComponent.svelte')).default,
    },
  ];

  let ViewComponent: Component = $state(UserSettingsComponent);

  async function changeViewComponent(tabView: AccountTabId) {
    const tab = tabs.find(tab => tab.id === tabView);

    if (!tab) return;

    ViewComponent = await tab.loadComponent();
  }

  onMount(async () => {
    await sessionStore.getAccount();
    await changeViewComponent('user');
  });
</script>

<div class="account-page p-3">
  {#if sessionStore.user}
    <div class="mt-3 flex w-full flex-col gap-6 lg:flex-row">
      <div class="sidemenu flex-shrink-0 flex-grow lg:flex-grow-0">
        <AccountSideMenu
          tabs={visibleAccountTabs(tabs, sessionStore.user.labels)}
          onSelect={tabId => changeViewComponent(tabId as AccountTabId)}
          onLogout={() => sessionStore.logout()}
        />
      </div>
      <div class="flex-grow">
        <ViewComponent />
      </div>
    </div>
  {:else if sessionStore.hasSessionLoaded}
    <AccountGuestPrompt onLogin={() => loginModalStore.open()} />
  {:else if !sessionStore.hasSessionLoaded}
    <AccountLoadingState />
  {/if}
</div>
