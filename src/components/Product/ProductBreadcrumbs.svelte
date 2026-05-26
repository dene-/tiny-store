<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Product } from '@/interfaces/store.interfaces';
  import { capitalizeFirstLetter } from '@/lib/utils.lib';

  const { product }: { product: Product } = $props();
  const primaryCategory = $derived(product.categories?.[0]);
</script>

<nav
  class="breadcrumbs mb-6 pl-3 lg:pl-0"
  aria-label="Breadcrumbs"
>
  <ul>
    <li><a href={resolve('/')}>Inicio</a></li>
    {#if primaryCategory}
      <li><a href={resolve(`/categoria/${primaryCategory.slug}`)}>{capitalizeFirstLetter(primaryCategory.slug)}</a></li>
    {/if}
    <li>{product.name}</li>
  </ul>
</nav>
