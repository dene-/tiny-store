import { describe, expect, it, vi } from 'vitest';

import { UseItemStore } from './itemStore.store.svelte';
import type { ItemErrorReporter, ProductGateway } from './item-store-deps';
import type { Product } from '@/interfaces/store.interfaces';

function product(id: number, name: string): Product {
  return { id, name } as Product;
}

describe('item store', () => {
  it('loads products through the injected gateway', async () => {
    const products = [product(1, 'Hat')];
    const gateway: ProductGateway = {
      listProducts: vi.fn().mockResolvedValue(products),
    };
    const reporter: ItemErrorReporter = { capture: vi.fn() };
    const store = new UseItemStore(gateway, reporter);

    await expect(store.getItems()).resolves.toEqual(products);

    expect(store.items).toBe(products);
    expect(store.error).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(reporter.capture).not.toHaveBeenCalled();
  });

  it('reports product load failures and clears stale products', async () => {
    const error = new Error('network failed');
    const gateway: ProductGateway = {
      listProducts: vi.fn().mockRejectedValue(error),
    };
    const reporter: ItemErrorReporter = { capture: vi.fn() };
    const store = new UseItemStore(gateway, reporter);
    store.products = [product(1, 'Stale')];

    await expect(store.getItems()).resolves.toEqual([]);

    expect(reporter.capture).toHaveBeenCalledWith(error);
    expect(store.error).toBe('Unable to load products');
    expect(store.items).toEqual([]);
    expect(store.isLoading).toBe(false);
  });
});
