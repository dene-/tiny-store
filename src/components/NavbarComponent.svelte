<script lang="ts">
  import { page } from '$app/stores';
  import { cartStore } from '@/stores/cartStore.store.svelte';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';
  import { goto } from '$app/navigation';

  import UserAvatarComponent from './User/UserAvatarComponent.svelte';
  import SearchIcon from './Icons/SearchIcon.svelte';
  import CubeIcon from './Icons/CubeIcon.svelte';

  function handleAccountClick() {
    if (!sessionStore.isLoggedIn) {
      loginModalStore.open();
    } else {
      goto('/account');
    }
  }
</script>

{#snippet navbarLinks()}
  <li>
    <a
      href="/"
      class:active={$page.url.pathname === '/'}
    >
      Shop
    </a>
  </li>
  <li>
    <a
      href="/cart"
      class:active={$page.url.pathname === '/cart'}
    >
      Cart
      {#if cartStore.items.length > 0}
        <span class="badge badge-primary font-bold">{cartStore.items.length}</span>
      {/if}
    </a>
  </li>
  {#if sessionStore.isLoggedIn}
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
    <li>
      <button
        class="text-sm text-gray-500"
        onclick={() => sessionStore.logout()}
      >
        Log out
      </button>
    </li>
  {:else if sessionStore.hasSessionLoaded}
    <li>
      <button onclick={() => loginModalStore.open()}> Log in </button>
    </li>
  {/if}
{/snippet}

<div class="drawer sticky top-0 z-40">
  <input
    id="my-drawer-3"
    type="checkbox"
    class="drawer-toggle"
  />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar w-full bg-base-300">
      <div class="flex-none lg:hidden">
        <label
          for="my-drawer-3"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
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
        <label class="input input-bordered mr-3 flex items-center gap-2">
          <input
            type="text"
            class="grow"
            placeholder="Search"
          />
          <SearchIcon />
        </label>
      {/if}
      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal items-center gap-3 text-lg">
          <!-- Navbar menu content here -->
          {@render navbarLinks()}
        </ul>
      </div>
    </div>
  </div>
  <div class="drawer-side z-50">
    <label
      for="my-drawer-3"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu min-h-full w-80 bg-base-200 p-4">
      {@render navbarLinks()}
    </ul>
  </div>
</div>

<style lang="scss">
  .navbar {
    view-transition-name: navbar;
  }
</style>
