<script lang="ts">
  import AlertComponent from '@/components/Alert/AlertComponent.svelte';

  let { onSendVerification }: { onSendVerification: () => Promise<void> | void } = $props();
</script>

<AlertComponent
  type="error"
  message="Please verify your email address to continue."
  classes="mb-3"
  actionText="Send verification email"
  action={onSendVerification}
/>
