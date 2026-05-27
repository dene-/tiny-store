<script lang="ts">
  import type { Component } from 'svelte';
  import LogoutIcon from '@/components/Icons/LogoutIcon.svelte';

  export type AccountSideMenuTab = {
    id: string;
    label: string;
    icon: Component;
  };

  let {
    tabs,
    onSelect,
    onLogout,
  }: {
    tabs: AccountSideMenuTab[];
    onSelect: (tabId: string) => void;
    onLogout: () => void;
  } = $props();
</script>

<ul class="menu rounded-box bg-base-200 w-full flex-row flex-nowrap gap-3 overflow-x-auto lg:w-56 lg:flex-col">
  {#each tabs as tab (tab.id)}
    <li>
      <button onclick={() => onSelect(tab.id)}>
        <tab.icon />
        {tab.label}
      </button>
    </li>
  {/each}
  <li>
    <button
      class="text-gray-500"
      onclick={onLogout}
    >
      <LogoutIcon />
      Cerrar sesión
    </button>
  </li>
</ul>
