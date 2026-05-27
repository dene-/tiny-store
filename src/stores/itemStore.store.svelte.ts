import type { Product } from '@/interfaces/store.interfaces';
import { consoleItemErrorReporter, remoteProductGateway, type ItemErrorReporter, type ProductGateway } from './item-store-deps';

export class UseItemStore {
  products = $state<Product[]>([]);
  isLoading = $state(false);
  error = $state<string | null>(null);

  constructor(
    private readonly productGateway: ProductGateway = remoteProductGateway,
    private readonly errorReporter: ItemErrorReporter = consoleItemErrorReporter,
  ) {}

  get items() {
    return this.products;
  }

  async getItems() {
    this.isLoading = true;
    this.error = null;

    try {
      this.products = await this.productGateway.listProducts();
    } catch (error) {
      this.errorReporter.capture(error);
      this.error = 'Unable to load products';
      this.products = [];
    } finally {
      this.isLoading = false;
    }

    return this.products;
  }
}

export const itemStore = new UseItemStore();
