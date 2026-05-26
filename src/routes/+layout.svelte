<script lang="ts">
  import 'toastify-js/src/toastify.css';
  import '../style/app.css';
  import { onNavigate } from '$app/navigation';
  import type { Snippet } from 'svelte';
  import NavbarComponent from '@/components/NavbarComponent.svelte';
  import { runViewTransition } from '@/lib/view-transition';

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();

  onNavigate(navigation => runViewTransition(document, navigation));
</script>

<NavbarComponent />

{#if children}
  <div class="container mx-auto flex-grow">
    {@render children()}
  </div>
{/if}
