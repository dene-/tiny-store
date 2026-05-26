<script lang="ts">
  import UserAvatarComponent from '@/components/User/UserAvatarComponent.svelte';

  let {
    isLoggedIn,
    hasSessionLoaded,
    isCompact = true,
    onOpenAccount,
  }: {
    isLoggedIn: boolean;
    hasSessionLoaded: boolean;
    isCompact?: boolean;
    onOpenAccount: () => void;
  } = $props();
</script>

{#if isLoggedIn}
  {#if !isCompact}
    <button
      class="rounded-full p-0"
      onclick={onOpenAccount}
      aria-label="Abrir cuenta"
    >
      <div class="avatar placeholder transition hover:brightness-125">
        <div class="bg-neutral text-neutral-content w-10 rounded-full">
          <UserAvatarComponent />
        </div>
      </div>
    </button>
  {:else}
    <button onclick={onOpenAccount}>Cuenta</button>
  {/if}
{:else if hasSessionLoaded}
  <button onclick={onOpenAccount}>Cuenta</button>
{/if}
