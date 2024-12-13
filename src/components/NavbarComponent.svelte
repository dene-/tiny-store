<script lang="ts">
  import { page } from '$app/stores';
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import UserAvatarComponent from './User/UserAvatarComponent.svelte';
  import SearchIcon from './Icons/SearchIcon.svelte';
  import CubeIcon from './Icons/CubeIcon.svelte';
  import CartIcon from './Icons/CartIcon.svelte';
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
  });
</script>

{#snippet navbarLinks(isPhoneView: boolean = true)}
  <li>
    <a href="/">Shop</a>
  </li>
  <li>
    <a href="/cart">
      Cart
      {#if cartStore.items.length > 0}
        <span class="badge badge-primary font-bold">{cartStore.items.length}</span>
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
            <div class="w-10 rounded-full bg-neutral text-neutral-content">
              <UserAvatarComponent />
            </div>
          </div>
        </button>
      </li>
    {:else}
      <li>
        <button onclick={handleAccountClick}> Account </button>
      </li>
    {/if}
  {:else if sessionStore.hasSessionLoaded}
    <li>
      <button onclick={() => loginModalStore.open()}> Log in </button>
    </li>
  {/if}
{/snippet}

<div class="drawer sticky top-0 z-40">
  <input
    id="drawer"
    type="checkbox"
    class="drawer-toggle"
  />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar w-full bg-base-300">
      <div class="flex-none lg:hidden">
        <label
          for="drawer"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          <MenuIcon />
        </label>
      </div>
      <div class="mx-2 flex-1 px-2 text-xl font-bold uppercase">
        <a
          href="/"
          class="flex items-center gap-2"
        >
          <CubeIcon />
          Tiny store
        </a>
      </div>
      {#if $page.url.pathname === '/'}
        <label class="input input-bordered mr-3 hidden items-center gap-2 md:flex">
          <input
            type="text"
            class="grow"
            placeholder="Search"
          />
          <SearchIcon />
        </label>
      {/if}
      <!-- <div class="md:hidden">
        <div class="indicator">
          <CartIcon />
          <div class="badge indicator-item badge-primary badge-sm rounded-full">{cartStore.items.length}</div>
        </div>
      </div> -->
      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal items-center gap-3 text-lg">
          <!-- Navbar menu content here -->
          {@render navbarLinks(false)}
        </ul>
      </div>
    </div>
  </div>
  <div class="drawer-side z-50">
    <label
      for="drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu min-h-full w-80 bg-base-200 p-4">
      {#if sessionStore.isLoggedIn}
        <button
          class="rounded-full p-0"
          onclick={handleAccountClick}
        >
          <div class="avatar placeholder transition hover:brightness-125">
            <div class="w-24 rounded-full bg-neutral text-neutral-content">
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
