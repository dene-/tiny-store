<script lang="ts">
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  import NavbarAccountButton from './Navbar/NavbarAccountButton.svelte';
  import NavbarBrand from './Navbar/NavbarBrand.svelte';
  import NavbarCartLink from './Navbar/NavbarCartLink.svelte';
  import MenuIcon from './Icons/MenuIcon.svelte';

  let isDrawerOpen = $state(false);
  const cartItemCount = $derived(cartStore.cart.items?.length || 0);

  function closeDrawer() {
    isDrawerOpen = false;
  }

  function handleAccountClick() {
    if (!sessionStore.isLoggedIn) {
      loginModalStore.open();
    } else {
      goto(resolve('/account'));
    }

    closeDrawer();
  }
</script>

{#snippet navbarLinks(isPhoneView: boolean = true)}
  <li>
    <a
      href={resolve('/')}
      onclick={closeDrawer}>Tienda</a
    >
  </li>
  <li>
    <NavbarCartLink
      {cartItemCount}
      onNavigate={closeDrawer}
    />
  </li>
  <li>
    <NavbarAccountButton
      isLoggedIn={sessionStore.isLoggedIn}
      hasSessionLoaded={sessionStore.hasSessionLoaded}
      isCompact={isPhoneView}
      onOpenAccount={handleAccountClick}
    />
  </li>
{/snippet}

<div class="drawer sticky top-0 z-40">
  <input
    id="drawer"
    autocomplete="off"
    type="checkbox"
    class="drawer-toggle"
    bind:checked={isDrawerOpen}
  />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-base-300/15 border-base-300 w-full justify-center border-b drop-shadow-xl">
      <div class="container flex items-center">
        <div class="flex-none lg:hidden">
          <label
            for="drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <MenuIcon />
          </label>
        </div>
        <div class="mx-2 flex-1 px-2 text-xl font-bold">
          <NavbarBrand />
        </div>
        <NavbarCartLink
          {cartItemCount}
          compact
          onNavigate={closeDrawer}
        />
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal items-center gap-3 text-lg">
            {@render navbarLinks(false)}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="drawer-side z-50">
    <label
      for="drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-200 min-h-full w-80 p-4">
      {@render navbarLinks()}
    </ul>
  </div>
</div>

<style lang="scss">
  .drawer {
    view-transition-name: navbar;
  }
</style>
