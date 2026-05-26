<script lang="ts">
  let {
    isRegistering,
    error,
    name = $bindable(),
    email = $bindable(),
    password = $bindable(),
  }: {
    isRegistering: boolean;
    error: string;
    name: string;
    email: string;
    password: string;
  } = $props();
</script>

{#if isRegistering}
  <input
    type="text"
    class="input input-bordered mb-3 w-full {error && 'input-error'}"
    placeholder="Name..."
    bind:value={name}
  />
{/if}
<input
  type="email"
  class="input input-bordered mb-3 w-full {error && 'input-error'}"
  placeholder="Email..."
  bind:value={email}
/>
<br />
<input
  type="password"
  class="input input-bordered w-full {error && 'input-error'}"
  placeholder="Password..."
  bind:value={password}
/>
{#if error}
  <span class="text-error mt-5 text-sm">{error}</span>
{/if}
