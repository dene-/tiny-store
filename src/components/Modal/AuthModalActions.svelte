<script lang="ts">
  let {
    isRegistering,
    onRegisterMode,
    onClose,
    onSubmit,
  }: {
    isRegistering: boolean;
    onRegisterMode: () => void;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
  } = $props();
</script>

<div class="modal-action border-primary mt-0 gap-3 border-t pt-5">
  {#if !isRegistering}
    <button
      class="btn"
      onclick={onRegisterMode}
    >
      Register
    </button>
  {/if}
  <div class="flex-grow"></div>
  <button
    class="btn border-0 bg-transparent"
    onclick={onClose}>Close</button
  >
  <button
    class="btn btn-primary"
    onclick={onSubmit}
  >
    {#if isRegistering}
      Register
    {:else}
      Log in
    {/if}
  </button>
</div>
