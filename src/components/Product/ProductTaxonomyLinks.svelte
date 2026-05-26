<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Product } from '@/interfaces/store.interfaces';

  const { product }: { product: Product } = $props();
</script>

<div class="flex gap-3 p-3">
  {#if product.categories?.length}
    <div>
      Categorías:
      {#each product.categories as category (category.id)}
        <a href={resolve(`/categoria/${category.slug}`)}>
          <span class="badge badge-outline mr-2">{category.slug}</span>
        </a>
      {/each}
    </div>
  {/if}
  {#if product.tags?.length}
    <div>
      Tags:
      {#each product.tags as tag (tag.id)}
        <a href={resolve(`/etiqueta/${tag.slug}`)}>
          <span class="badge badge-secondary badge-outline mr-2">{tag.slug}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>
