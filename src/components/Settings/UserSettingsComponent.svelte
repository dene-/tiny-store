<script lang="ts">
  import { onMount } from 'svelte';

  import AlertComponent from '@/components/Alert/AlertComponent.svelte';
  import UserAvatarComponent from '../User/UserAvatarComponent.svelte';

  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { userStore } from '@/stores/userStore.store.svelte';

  import FormGenerator from '../Form/FormGenerator.svelte';
  import type { InputField } from '@/interfaces/forms.interfaces';

  let avatarFileInput: HTMLInputElement | null = $state(null);
  let formFieldsLoaded = $state(false);
  let userForm = $state({
    name: '',
    prefs: {
      username: '',
    },
    email: '',
    password: '',
  });

  const formFields: InputField[] = $derived([
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      value: userForm.name,
      placeholder: 'Enter your name',
    },
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      value: userForm.prefs.username,
      placeholder: 'Enter your username',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      fullWidth: true,
      value: userForm.email,
      placeholder: 'Enter your email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      value: userForm.password,
      placeholder: 'Enter your password',
    },
  ]);

  async function handleAvatarUpload() {
    if (avatarFileInput?.files && avatarFileInput.files[0]) {
      await userStore.uploadAvatar(avatarFileInput.files[0]);
    }
  }

  async function handleFormSubmit(formData: Record<string, any>) {
    await userStore.updateAccount(formData.name, formData.email, formData.password, {
      username: formData.username,
    });
  }

  onMount(async () => {
    if (sessionStore.user) {
      userForm.name = sessionStore.user.name;
      userForm.prefs.username = sessionStore.user.prefs.username;
      userForm.email = sessionStore.user.email;
      userForm.password = sessionStore.user.password as string;
    }

    formFieldsLoaded = true;

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
  <div class="flex flex-col items-center">
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
  </div>
  {#if formFieldsLoaded}
    <FormGenerator
      formName="user-form"
      buttonText="Save"
      fields={formFields}
      onSubmit={handleFormSubmit}
    />
  {/if}
  <!-- <button class="btn btn-primary mt-5 w-full max-w-xs">Save</button> -->
{/if}
