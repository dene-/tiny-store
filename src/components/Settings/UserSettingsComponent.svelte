<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  import AccountAvatarUploader from './AccountAvatarUploader.svelte';
  import AccountProfileForm from './AccountProfileForm.svelte';
  import AccountVerificationAlert from './AccountVerificationAlert.svelte';
  import { emailVerificationParams } from '@/features/account/account-navigation';
  import { sessionStore } from '@/stores/sessionStore.store.svelte';
  import { userStore } from '@/stores/userStore.store.svelte';
  import type { FormDataRecord } from '@/interfaces/forms.interfaces';

  async function handleFormSubmit(formData: FormDataRecord) {
    await userStore.updateAccount({
      name: String(formData.name),
      email: String(formData.email),
      password: String(formData.password),
      prefs: {
        username: String(formData.username),
      },
    });
  }

  async function handleAvatarUpload(file: File) {
    await userStore.uploadAvatar(file);
  }

  onMount(async () => {
    const params = emailVerificationParams(location.search);

    if (params) {
      await userStore.verifyEmail(params.userId, params.secret);
      await goto(resolve('/account'));
    }
  });
</script>

{#if sessionStore.user}
  {#if !sessionStore.user.emailVerified}
    <AccountVerificationAlert onSendVerification={() => sessionStore.verifyEmail()} />
  {/if}
  <AccountAvatarUploader onUpload={handleAvatarUpload} />
  <AccountProfileForm
    user={sessionStore.user}
    onSubmit={handleFormSubmit}
  />
{/if}
