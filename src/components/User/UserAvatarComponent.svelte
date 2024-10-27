<script lang="ts">
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
</script>

{#if sessionStore.user}
  <img
    src={sessionStore.user.prefs.avatar || '/images/blank-avatar.webp'}
    alt="Avatar"
  />
{/if}
