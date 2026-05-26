<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import AuthFields from './AuthFields.svelte';
  import AuthModalActions from './AuthModalActions.svelte';
  import { loginModalStore } from '@/stores/loginModal.store.svelte';

  let email = $state('');
  let password = $state('');
  let name = $state('');

  let isRegistering = $state(false);

  const captureLoginModal: Attachment<HTMLDialogElement> = element => {
    loginModalStore.modal = element;

    return () => {
      if (loginModalStore.modal === element) {
        loginModalStore.modal = null;
      }
    };
  };

  function clearInputs() {
    email = password = name = '';
  }

  async function handleButton() {
    let actionResult = '';

    if (isRegistering) {
      actionResult = await loginModalStore.register(name, email, password);
    } else {
      actionResult = await loginModalStore.logIn(email, password);
    }

    if (actionResult === 'success') {
      clearInputs();
    }
  }
</script>

<dialog
  id="loginModal"
  class="modal sm:modal-middle"
  {@attach captureLoginModal}
>
  <div class="modal-box">
    <h3 class="mb-5 text-lg font-bold">
      {#if isRegistering}
        Register
      {:else}
        Log in
      {/if}
    </h3>
    <p class="pb-5">
      <AuthFields
        {isRegistering}
        error={loginModalStore.error}
        bind:name
        bind:email
        bind:password
      />
    </p>
    <AuthModalActions
      {isRegistering}
      onRegisterMode={() => (isRegistering = true)}
      onClose={() => loginModalStore.close()}
      onSubmit={handleButton}
    />
  </div>
</dialog>
