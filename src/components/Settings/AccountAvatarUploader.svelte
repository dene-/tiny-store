<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import UserAvatarComponent from '@/components/User/UserAvatarComponent.svelte';

  let { onUpload }: { onUpload: (file: File) => Promise<void> | void } = $props();

  let avatarFileInput: HTMLInputElement | undefined;

  const captureAvatarFileInput: Attachment<HTMLInputElement> = element => {
    avatarFileInput = element;

    return () => {
      if (avatarFileInput === element) {
        avatarFileInput = undefined;
      }
    };
  };

  async function handleAvatarUpload() {
    const file = avatarFileInput?.files?.[0];

    if (file) {
      await onUpload(file);
    }
  }
</script>

<div class="flex flex-col items-center">
  <div class="avatar placeholder transition hover:brightness-125">
    <div class="bg-neutral text-neutral-content w-36 rounded-full">
      <UserAvatarComponent />
    </div>
  </div>
  <input
    type="file"
    class="hidden"
    accept="image/jpeg, image/png, image/webp"
    {@attach captureAvatarFileInput}
    onchange={handleAvatarUpload}
  />
  <button
    class="btn btn-ghost btn-sm mt-3"
    onclick={() => avatarFileInput?.click()}>Upload avatar</button
  >
</div>
