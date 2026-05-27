<script lang="ts">
  import { resolve } from '$app/paths';
  import CartIcon from '@/components/Icons/CartIcon.svelte';

  let {
    cartItemCount,
    compact = false,
    onNavigate,
  }: {
    cartItemCount: number;
    compact?: boolean;
    onNavigate: () => void;
  } = $props();
</script>

<a
  href={resolve('/carrito')}
  class={compact ? 'mr-3 flex shrink-0 lg:hidden' : undefined}
  aria-label="Ver carrito de compras"
  onclick={onNavigate}
>
  {#if compact}
    <span class="mr-1">
      <CartIcon />
    </span>
    {#if cartItemCount > 0}
      <div class="indicator">
        <div class="indicator-item badge badge-xs badge-primary self-start font-mono">{cartItemCount}</div>
      </div>
    {/if}
  {:else}
    <div class="indicator pr-3">
      <span class="mr-1">
        <CartIcon />
      </span>
      Carrito
      {#if cartItemCount > 0}
        <div class="indicator-item badge badge-sm badge-primary font-mono">{cartItemCount}</div>
      {/if}
    </div>
  {/if}
</a>
