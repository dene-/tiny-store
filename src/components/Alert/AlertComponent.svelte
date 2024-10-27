<script lang="ts">
  import ErrorIcon from './../Icons/ErrorIcon.svelte';
  import InfoIcon from '../Icons/InfoIcon.svelte';
  import WarningIcon from '../Icons/WarningIcon.svelte';
  import SuccessIcon from '../Icons/SuccessIcon.svelte';

  interface Props {
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    classes?: string;
    action?: () => any;
    actionText?: string;
  }

  const { type, message, classes = '', action, actionText }: Props = $props();
</script>

<div
  role="alert"
  class="alert alert-{type} bg-red-600 {classes}"
>
  {#if type === 'info'}
    <InfoIcon />
  {:else if type === 'warning'}
    <WarningIcon />
  {:else if type === 'error'}
    <ErrorIcon />
  {:else if type === 'success'}
    <SuccessIcon />
  {/if}
  <span>{message}</span>
  {#if action}
    <button
      class="btn btn-primary btn-sm"
      onclick={action}>{actionText}</button
    >
  {/if}
</div>
