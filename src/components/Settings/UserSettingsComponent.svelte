<script lang="ts">
  import { onMount } from 'svelte';

  import AlertComponent from '@/components/Alert/AlertComponent.svelte';
  import UserAvatarComponent from '../User/UserAvatarComponent.svelte';

  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { userStore } from '@/stores/userStore.store.svelte';

  import { page } from '$app/stores';

  let avatarFileInput: HTMLInputElement | null = $state(null);
  let userForm = $state({
    name: '',
    prefs: {
      username: '',
    },
    email: '',
    password: '',
  });

  async function handleAvatarUpload() {
    if (avatarFileInput?.files && avatarFileInput.files[0]) {
      const avatar = avatarFileInput.files[0];
      await userStore.uploadAvatar(avatar);
    }
  }

  onMount(async () => {
    if (sessionStore.user) {
      userForm = {
        name: sessionStore.user.name,
        prefs: {
          username: sessionStore.user.prefs.username,
        },
        email: sessionStore.user.email,
        password: sessionStore.user.password as string,
      };
    }

    const urlSearchParams = new URLSearchParams(location.search);

    if (urlSearchParams.has('userId') && urlSearchParams.has('secret')) {
      await userStore.verifyEmail(urlSearchParams.get('userId') as string, urlSearchParams.get('secret') as string);
      location.href = '/account';
    }
  });
</script>

{#if sessionStore.user}
  {#if !sessionStore.user.emailVerification}
    <AlertComponent
      type="error"
      message="Please verify your email address to continue."
      classes="mb-3"
      actionText="Send verification email"
      action={() => sessionStore.verifyEmail()}
    />
  {/if}
  <div class="avatar placeholder transition hover:brightness-125">
    <div class="w-36 rounded-full bg-neutral text-neutral-content">
      <UserAvatarComponent />
    </div>
  </div>
  <input
    type="file"
    class="hidden"
    accept="image/jpeg, image/png, image/webp"
    bind:this={avatarFileInput}
    onchange={handleAvatarUpload}
  />
  <button
    class="btn btn-ghost btn-sm mt-3"
    onclick={() => avatarFileInput?.click()}>Upload avatar</button
  >
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text text-xs">Name</span>
    </div>
    <input
      type="text"
      class="input input-bordered"
      bind:value={userForm.name}
    />
  </label>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text text-xs">Username</span>
    </div>
    <input
      type="text"
      class="input input-bordered"
      bind:value={userForm.prefs.username}
    />
  </label>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text text-xs">Email</span>
    </div>
    <input
      type="text"
      class="input input-bordered"
      bind:value={userForm.email}
    />
  </label>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text text-xs">Password</span>
    </div>
    <input
      type="password"
      class="input input-bordered"
      bind:value={userForm.password}
    />
  </label>
  <button class="btn btn-primary mt-5 w-full max-w-xs">Save</button>
{/if}
