import { Query } from 'appwrite';
import { databases, ids } from '@/lib/appwrite.lib';
import type { Item } from '@/stores/itemStore.store.svelte';

export async function load({ params }): Promise<Item | undefined> {
  const response = await databases.listDocuments(ids.databases.STORE, ids.collections.ITEMS, [Query.equal('product_url', params.product_url)]);

  if (!response.documents.length) {
    return undefined;
  }

  const item: Item = response.documents[0] as Item;

  return item;
}
