import type { Product } from '@/interfaces/store.interfaces';
import { getProducts } from '@/routes/api/products.remote';

export interface ProductGateway {
  listProducts(): Promise<Product[]>;
}

export interface ItemErrorReporter {
  capture(error: unknown): void;
}

export const remoteProductGateway: ProductGateway = {
  listProducts: () => getProducts(),
};

export const consoleItemErrorReporter: ItemErrorReporter = {
  capture(error) {
    console.error(error);
  },
};
