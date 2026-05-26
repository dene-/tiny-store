import type { Cart, CartItem, Product } from '@/interfaces/store.interfaces';
import {
  applyCartResponse,
  browserCartTokenStorage,
  remoteCartGateway,
  toastCartNotifier,
  type CartGateway,
  type CartNotifier,
  type CartTokenStorage,
} from './cart-store-deps';

type CartGatewayResult = {
  cart?: Cart;
  cartToken?: string | null;
};

class UseCartStore {
  cart = $state({}) as Cart;
  cartToken = $state('') as string;

  constructor(
    private readonly gateway: CartGateway = remoteCartGateway,
    private readonly tokenStorage: CartTokenStorage = browserCartTokenStorage,
    private readonly notifier: CartNotifier = toastCartNotifier,
  ) {
    this.cartToken = this.tokenStorage.read();
  }

  private syncCartToken(cartToken: string | null | undefined) {
    if (!cartToken) return;

    this.tokenStorage.write(cartToken);
    this.cartToken = cartToken;
  }

  private applyCartResult(result: CartGatewayResult, updateCart = true) {
    this.syncCartToken(result.cartToken);

    if (updateCart) {
      this.cart = applyCartResponse(this.cart, result.cart);
    }

    return result.cart;
  }

  async getCart() {
    const localCartToken = this.tokenStorage.read() || undefined;
    const result = await this.gateway.getCart(localCartToken);

    this.syncCartToken(result.cartToken);
    this.cart = result.cart;
  }

  async addItem(product: Product, quantity: number) {
    const result = await this.gateway.addItem({
      id: product.id,
      quantity,
      cartToken: this.cartToken,
    });

    this.applyCartResult(result);

    this.notifier.success(`"${product.name}" añadido al carrito`);
  }

  removeItem = async (cartItem: CartItem, options: { updateCart?: boolean; notify?: boolean } = {}) => {
    const { updateCart = true, notify = true } = options;
    const result = await this.gateway.removeItem({
      key: cartItem.key,
      cartToken: this.cartToken,
    });

    const cart = this.applyCartResult(result, updateCart);

    if (notify) {
      this.notifier.success(result.message || `"${cartItem.name}" eliminado del carrito`);
    }

    return cart;
  };

  updateItem = async (cartItem: CartItem, quantity: number) => {
    if (quantity === 0) {
      return this.removeItem(cartItem);
    }

    const result = await this.gateway.updateItem({
      key: cartItem.key,
      quantity,
      cartToken: this.cartToken,
    });

    this.applyCartResult(result);

    this.notifier.success(result.message || `"${cartItem.name}" actualizado en el carrito`);
  };

  async clearCart() {
    const cartItems = this.cart.items || [];
    let nextCart: Cart | undefined;

    for (const item of cartItems) {
      nextCart = await this.removeItem(item, { updateCart: false, notify: false });
    }

    if (nextCart) {
      this.cart = nextCart;
    }

    this.notifier.success('Carrito vaciado correctamente');
  }
}

export const cartStore = new UseCartStore();
