import type { AppwriteException } from 'appwrite';
import { ID } from 'appwrite';
import { account, storage, ids } from '@/lib/appwrite.lib';
import { sessionStore } from './sessionStore.store.svelte';

class UseUserStore {
  async logIn(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      return 'success';
    } catch (error) {
      console.error(error);
      return (error as AppwriteException).message;
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password, name);
      return 'success';
    } catch (error) {
      console.error(error);
      return (error as AppwriteException).message;
    }
  }

  async verifyEmail(userId: string, secret: string) {
    console.log(userId, secret);
    try {
      await account.updateVerification(userId, secret);
    } catch (error) {
      console.error(error);
    }
  }

  async uploadAvatar(file: File) {
    try {
      if (!sessionStore.user) {
        throw new Error('User not found');
      }

      const fileExt = file.name.split('.').pop();
      const newFile = new File([file], `${sessionStore.user?.name}_avatar.${fileExt}`, {
        type: file.type,
      });

      const avatarBucketUpload = await storage.createFile(ids.buckets.avatars, ID.unique(), newFile);

      if (!avatarBucketUpload.$id) {
        throw new Error('Error uploading file');
      }

      const avatarLink = await storage.getFileView(ids.buckets.avatars, avatarBucketUpload.$id);

      if (!avatarLink) {
        throw new Error('Error getting file download link');
      }

      await account.updatePrefs({
        ...sessionStore.user.prefs,
        avatar: avatarLink,
      });

      sessionStore.user.prefs.avatar = avatarLink;
    } catch (error) {
      console.error(error);
    }
  }
}

export const userStore = new UseUserStore();
