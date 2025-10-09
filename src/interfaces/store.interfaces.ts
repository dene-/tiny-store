export type Money = {
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  price: string; // smallest unit as string per Store API
};

// Augmented with optional fields returned by the Store API
export type ProductImage = {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
  name?: string;
  srcset?: string;
  sizes?: string;
};

// Lightweight term object used by products endpoint for categories/tags/brands
export type StoreTerm = {
  id: number;
  name: string;
  slug: string;
  link: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  // Extra fields seen in response
  parent?: number;
  type?: string; // e.g. "simple", "variable"
  variation?: string;
  permalink?: string;

  summary?: string;
  short_description?: string;
  description?: string;

  on_sale: boolean;
  prices: {
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    price: string;
    regular_price: string;
    sale_price: string | null;

    // Extra price metadata
    price_range?: unknown | null;
    currency_decimal_separator?: string;
    currency_thousand_separator?: string;
    currency_prefix?: string;
    currency_suffix?: string;
  };

  // HTML string from API
  price_html?: string;

  average_rating?: string;
  review_count?: number;

  images: ProductImage[];

  // Taxonomy terms from API
  categories?: StoreTerm[];
  tags?: StoreTerm[];
  brands?: StoreTerm[];

  // Options/relationships (kept loose for compatibility)
  attributes?: Array<Record<string, unknown>>;
  variations?: Array<number | Record<string, unknown>>;
  grouped_products?: number[];

  has_options?: boolean;

  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder?: boolean;
  low_stock_remaining?: number | null;
  stock_availability?: { text: string; class: string };
  sold_individually?: boolean;

  // Expanded add_to_cart payload from API
  add_to_cart?: {
    text: string;
    description: string;
    url?: string;
    single_text?: string;
    minimum?: number;
    maximum?: number;
    multiple_of?: number;
  };

  // Extensions container
  extensions?: Record<string, unknown>;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent: number;
  count: number;
  image: ProductImage | null;
  permalink: string;
};

export type CartItem = {
  key: string;
  id: number; // product or variation id
  quantity: number;
  name: string;
  sku: string | null;
  images: ProductImage[];
  variation: Array<{ raw_attribute: string; attribute: string; value: string }>;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
  };
  totals: {
    line_subtotal: string;
    line_total: string;
    currency_code: string;
  };
};

export type Address = {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
};

export type ShippingRate = {
  rate_id: string; // e.g. "local_pickup:13" or "flat_rate:1"
};
