<script lang="ts">
  // import { page } from '$app/stores';
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import UserAvatarComponent from './User/UserAvatarComponent.svelte';
  // import SearchIcon from './Icons/SearchIcon.svelte';
  import CubeIcon from './Icons/CubeIcon.svelte';
  import MenuIcon from './Icons/MenuIcon.svelte';

  function handleAccountClick() {
    if (!sessionStore.isLoggedIn) {
      loginModalStore.open();
    } else {
      goto('/account');
    }
    (document.getElementById('drawer') as HTMLInputElement).checked = false;
  }

  onMount(() => {
    document.querySelectorAll('.menu li').forEach(el => {
      el.addEventListener('click', () => {
        (document.getElementById('drawer') as HTMLInputElement).checked = false;
      });
    });

    $inspect(cartStore.cart);
  });
</script>

{#snippet navbarLinks(isPhoneView: boolean = true)}
  <li>
    <a href="/">Tienda</a>
  </li>
  <li>
    <a href="/sobre-nosotros">Sobre nosotros</a>
  </li>
  <li>
    <a href="/cart">
      Carrito
      {#if cartStore.cart.items && cartStore.cart.items.length > 0}
        <span class="badge badge-primary font-bold">{cartStore.cart.items.length}</span>
      {/if}
    </a>
  </li>
  {#if sessionStore.isLoggedIn}
    {#if !isPhoneView}
      <li>
        <button
          class="rounded-full p-0"
          onclick={handleAccountClick}
        >
          <div class="avatar placeholder transition hover:brightness-125">
            <div class="bg-neutral text-neutral-content w-10 rounded-full">
              <UserAvatarComponent />
            </div>
          </div>
        </button>
      </li>
    {:else}
      <li>
        <button onclick={handleAccountClick}> Cuenta </button>
      </li>
    {/if}
  {:else if sessionStore.hasSessionLoaded}
    <li>
      <button onclick={() => loginModalStore.open()}> Cuenta </button>
    </li>
  {/if}
{/snippet}

<div class="drawer sticky top-0 z-40">
  <input
    id="drawer"
    autocomplete="off"
    type="checkbox"
    class="drawer-toggle"
  />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-base-300/15 w-full justify-center shadow-xl">
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
          <a
            href="/"
            class="flex items-center gap-2"
          >
            <CubeIcon />
            Mami Crafts
          </a>
        </div>
        <!-- {#if $page.url.pathname === '/'}
          <form autocomplete="off">
            <label class="input input-bordered mr-3 hidden items-center gap-2 md:flex">
              <input
                type="search"
                name="search"
                class="grow"
                placeholder="Search"
              />
              <SearchIcon />
            </label>
          </form>
        {/if} -->
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal items-center gap-3 text-lg">
            <!-- Navbar menu content here -->
            {@render navbarLinks(false)}
          </ul>
        </div>
      </div>
      <!-- <div class="md:hidden">
        <div class="indicator">
          <CartIcon />
          <div class="badge indicator-item badge-primary badge-sm rounded-full">{cartStore.items.length}</div>
        </div>
      </div> -->
    </div>
  </div>
  <div class="drawer-side z-50">
    <label
      for="drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-200 min-h-full w-80 p-4">
      {#if sessionStore.isLoggedIn}
        <button
          class="rounded-full p-0"
          onclick={handleAccountClick}
        >
          <div class="avatar placeholder transition hover:brightness-125">
            <div class="bg-neutral text-neutral-content w-24 rounded-full">
              <UserAvatarComponent />
            </div>
          </div>
        </button>
      {/if}
      {@render navbarLinks()}
    </ul>
  </div>
</div>

<style lang="scss">
  .drawer {
    view-transition-name: navbar;
  }
</style>
