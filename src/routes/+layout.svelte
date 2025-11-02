<script lang="ts">
  import 'toastify-js/src/toastify.css';
  import '../style/app.css';
  import { onNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import LoginModal from '@/components/Modal/LoginModal.svelte';
  import NavbarComponent from '@/components/NavbarComponent.svelte';

  import { sessionStore } from '@/stores/sessionStore.store.svelte';

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();

  onNavigate(navigation => {
    if (!document.startViewTransition) return;

    return new Promise(resolve => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  onMount(async () => {
    await sessionStore.getAccount();
  });
</script>

<svelte:head>
  <title>Tienda Mami Crafts</title>
  <meta
    name="description"
    content="Explora nuestra variedad de productos disponibles en Mami Crafts. Encuentra lo que necesitas con facilidad."
  />
</svelte:head>

<NavbarComponent />
<LoginModal />

{#if children}
  <div class="container mx-auto flex-grow">
    {@render children()}
  </div>
{/if}
