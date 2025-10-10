import type { Models } from 'appwrite';
export interface Item extends Models.Document {
  /**
   * Name of the item.
   */
  name: string;
  /**
   * Description of the item.
   */
  description: string;
  /**
   * Short description of the item.
   */
  short_description: string;
  /**
   * Price of the item.
   */
  price: number;
  /**
   * SKU (Stock Keeping Unit) of the item.
   */
  sku: string;
  /**
   * Tags associated with the item.
   */
  tags: string[];
  /**
   * Categories the item belongs to.
   */
  categories: string[];
  /**
   * URL of the item's image.
   */
  image_url: string;
  /**
   * Alt text for the item's image.
   */
  image_alt: string;
  /**
   * URL of the product page.
   */
  product_url: string;
}

export interface ItemsResponse {
  items: Item[];
  count: number;
}
