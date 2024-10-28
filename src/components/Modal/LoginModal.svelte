<script lang="ts">
  import { loginModalStore } from '@/stores/loginModal.store.svelte';

  let email = $state('');
  let password = $state('');
  let name = $state('');
  let username = $state('');

  let isRegistering = $state(false);

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

  $effect(() => {
    const loginModal = document.getElementById('loginModal') as HTMLDialogElement;

    if (!loginModal) return;

    if (loginModalStore.isOpen) {
      loginModal.showModal();
    } else {
      loginModal.close();
    }

    console.log('Login modal effect called.');
  });
</script>

{#snippet loginForm()}
  <input
    type="email"
    class="input input-bordered mb-3 w-full {loginModalStore.error && 'input-error'}"
    placeholder="Email..."
    bind:value={email}
  />
  <br />
  <input
    type="password"
    class="input input-bordered w-full {loginModalStore.error && 'input-error'}"
    placeholder="Password..."
    bind:value={password}
  />
  {#if loginModalStore.error}
    <span class="mt-5 text-sm text-error">{loginModalStore.error}</span>
  {/if}
{/snippet}

{#snippet registerForm()}
  <input
    type="text"
    class="input input-bordered mb-3 w-full {loginModalStore.error && 'input-error'}"
    placeholder="Name..."
    bind:value={username}
  />
  <input
    type="text"
    class="input input-bordered mb-3 w-full {loginModalStore.error && 'input-error'}"
    placeholder="Name..."
    bind:value={name}
  />
  <input
    type="email"
    class="input input-bordered mb-3 w-full {loginModalStore.error && 'input-error'}"
    placeholder="Email..."
    bind:value={email}
  />
  <br />
  <input
    type="password"
    class="input input-bordered w-full {loginModalStore.error && 'input-error'}"
    placeholder="Password..."
    bind:value={password}
  />
  {#if loginModalStore.error}
    <span class="mt-5 text-sm text-error">{loginModalStore.error}</span>
  {/if}
{/snippet}

<dialog
  id="loginModal"
  class="modal sm:modal-middle"
  onclose={() => loginModalStore.close()}
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
      {#if isRegistering}
        {@render registerForm()}
      {:else}
        {@render loginForm()}
      {/if}
    </p>
    <div class="modal-action mt-0 gap-3 border-t border-primary pt-5">
      {#if !isRegistering}
        <button
          class="btn"
          onclick={() => (isRegistering = true)}
        >
          Register
        </button>
      {/if}
      <div class="flex-grow"></div>
      <button
        class="btn border-0 bg-transparent"
        onclick={() => loginModalStore.close()}>Close</button
      >
      <button
        class="btn btn-primary"
        onclick={handleButton}
      >
        {#if isRegistering}
          Register
        {:else}
          Log in
        {/if}
      </button>
    </div>
  </div>
</dialog>
