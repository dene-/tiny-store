<script lang="ts">
  import 'toastify-js/src/toastify.css';
  import '../style/app.css';
  import { onNavigate } from '$app/navigation';
  import type { Snippet } from 'svelte';
  import LoginModal from '@/components/Modal/LoginModal.svelte';
  import NavbarComponent from '@/components/NavbarComponent.svelte';

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
</script>

<NavbarComponent />
<LoginModal />

{#if children}
  <div class="container mx-auto flex-grow">
    {@render children()}
  </div>
{/if}
