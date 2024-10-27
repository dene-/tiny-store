import type { ItemsResponse } from '@/interfaces/appWrite.interfaces';
import { Query } from 'appwrite';
import { databases, ids } from '@/lib/appwrite.lib';
import type { Item } from '@/stores/itemStore.store.svelte';

export async function load({ params }): Promise<ItemsResponse> {
  const response = await databases.listDocuments(ids.databases.STORE, ids.collections.ITEMS, [Query.contains('categories', params.category)]);

  const items: Item[] = [];

  if (response.documents.length) {
    for (const item of response.documents) {
      items.push(item as Item);
    }
  }

  return {
    items,
    count: response.total,
  };
}
