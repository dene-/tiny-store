import type { Item } from './appWrite.interfaces';

export interface CartItem extends Item {
  quantity: number;
}
