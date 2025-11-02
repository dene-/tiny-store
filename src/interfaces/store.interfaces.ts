/**
 * Currency details returned with price and total values. Munknown objects in the
 * Store API include these fields to describe how monetary values should be
 * formatted.
 */
export interface CurrencyInfo {
  currency_code: string;
  /** e.g. "$" */
  currency_symbol: string;
  /** Number of digits after the decimal point, e.g. 2 for cents. */
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  /** Prefix placed before currency values, e.g. "$" */
  currency_prefix: string;
  /** Suffix placed after currency values, e.g. "€" for European markets. */
  currency_suffix: string;
}

/**
 * Raw price representation. This exposes unformatted integers so that
 * calculations may be performed without worrying about decimal places.
 */
export interface RawPrices {
  precision: number;
  price: string;
  regular_price: string;
  sale_price: string;
}

/**
 * Price information returned for products, cart items and order items.
 */
export interface Price extends CurrencyInfo {
  /** Current price of the item. Represented as a string in minor units. */
  price: string;
  /** Regular (non‑sale) price of the item. */
  regular_price: string;
  /** Sale price if the item is discounted; otherwise same as `regular_price`. */
  sale_price: string;
  /** Optional price range used on products with multiple variations. */
  price_range: PriceRange | null;
  /** Unformatted raw prices for arithmetic operations. */
  raw_prices: RawPrices;
}

export interface Prices {
  currency_code: string;
  currency_decimal_separator: string;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
  currency_symbol: string;
  currency_thousand_separator: string;
  price: string;
  price_range: null;
  regular_price: string;
  sale_price: string;
}

/**
 * Defines a price range for products with variable pricing. Contains the
 * minimum and maximum price across all variations along with currency data.
 */
export interface PriceRange extends CurrencyInfo {
  min_price: string;
  max_price: string;
}

/**
 * Limitations on how munknown units of an item may be added to the cart.
 */
export interface QuantityLimits {
  minimum: number;
  maximum: number;
  multiple_of: number;
  /** Whether the quantity field can be edited by the shopper. */
  editable: boolean;
}

/**
 * Representation of an attribute/value pair used to describe product
 * variations when adding items to the cart.
 */
export interface VariationAttribute {
  /**
   * Identifier for the attribute. For global attributes this is the slug
   * beginning with `pa_`, e.g. `pa_color`. For custom attributes it can
   * be the attribute name or slug (both are case sensitive).
   */
  attribute: string;
  /** Selected value for the attribute. */
  value: string;
}

/**
 * Metadata attached to order and cart items. Each entry contains a name
 * describing the field and an optional display value. This may be empty.
 */
export interface ItemData {
  name: string;
  value?: string | null;
}

/**
 * Definition of an image associated with a product or review. The API
 * provides multiple sizes of the same image along with alt text.
 */
export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

/* --------------------------------------------------------------------------
 * Cart entities
 * -------------------------------------------------------------------------- */

/**
 * A single coupon applied to the cart. The Store API returns coupons as
 * simplified objects containing the code, discount type and total amounts.
 */
export interface CartCoupon extends CurrencyInfo {
  code: string;
  /** The discount type (e.g. fixed_cart, percent). */
  type: string;
  /** Currency totals for the coupon, including tax amounts. */
  total_discount: string;
  total_discount_tax: string;
  /**
   * Links to the resource, present only when listing coupons. These fields
   * mirror the WP REST API `_links` response. They may be omitted in
   * single coupon responses.
   */
  _links?: {
    self: { href: string }[];
    collection: { href: string }[];
  };
}

/**
 * Extra fees added to the cart. Each fee includes a key, a display name
 * and totals including tax.
 */
export interface CartFee extends CurrencyInfo {
  /** Fee identifier (also returned as `key` in the API). */
  id: string;
  name: string;
  total: string;
  total_tax: string;
}

/**
 * A shipping rate available for a cart package. Each rate includes pricing
 * details, taxes and metadata such as method identifiers.
 */
export interface ShippingRate extends CurrencyInfo {
  /** Unique identifier combining the shipping method and instance ID. */
  rate_id: string;
  name: string;
  description: string;
  /** Estimated delivery time or range. */
  delivery_time?: string | null;
  /** Cost of the shipping rate. */
  price: string;
  /** Tax portion of the shipping price. */
  taxes: string;
  /** WooCommerce shipping method identifier. */
  method_id: string;
  /** Specific instance identifier for the method. */
  instance_id: string;
  /** Custom meta data associated with the rate (e.g. description lines). */
  meta_data?: Array<{ key: string; value: string }>;
  /** Whether this rate is currently selected by the shopper. */
  selected: boolean;
}

/**
 * A shipping package within the cart. When multiple shipping addresses or
 * vendors are involved, the cart may contain multiple packages.
 */
export interface CartShippingPackage extends CurrencyInfo {
  package_id: number;
  name: string;
  /** Destination address for the package. Some fields may be empty strings. */
  destination: {
    first_name?: string;
    last_name?: string;
    compunknown?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    phone?: string;
  };
  /** Summary of items contained in the package (key and quantity only). */
  items: Array<{ key: string; name: string; quantity: number }>;
  /** Available shipping rates for this package. */
  shipping_rates: ShippingRate[];
}

/**
 * Common properties for cart and order items. These are used by both
 * `CartItem` and `OrderItem` interfaces. Fields correspond to those
 * returned by the Store API and underlying PHP schemas.
 */
export interface BaseItem {
  /** Unique key identifying the line item in the cart or order. */
  key: string;
  /** Product or variation ID. */
  id: number;
  /** Number of units ordered. */
  quantity: number;
  /** Whether this item refers to a variation (optional in some responses). */
  type?: string;
  /** Limits on quantity selection for the item. */
  quantity_limits: QuantityLimits;
  name: string;
  short_description: string | null;
  description: string | null;
  sku: string | null;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Image[];
  /** Selected variation attributes; empty array for simple products. */
  variation: VariationAttribute[];
  /** Additional data displayed below the item name (e.g. attribute names). */
  item_data: ItemData[];
  /** Pricing information. */
  prices: Prices;
  /** Line totals including tax and currency info. */
  totals: LineTotals;
  /** Catalogue visibility status, e.g. "visible" or "catalog". */
  catalog_visibility: string;
  /** Additional extension data keyed by plugin or theme. */
  extensions: Record<string, unknown>;
  /** WP REST API links when listing cart items. */
  _links?: {
    self: { href: string }[];
    collection: { href: string }[];
  };
}

/**
 * Line totals for cart and order items. Includes subtotal and total values
 * along with their tax amounts. Currency fields are included.
 */
export interface LineTotals extends CurrencyInfo {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
}

/**
 * Cart item as returned by the `/cart` and `/cart/items` endpoints.
 */
export interface CartItem extends BaseItem {}

/**
 * Top‑level totals returned by the cart API. These correspond to the totals
 * object documented by the WooCommerce Store API and include sums of items,
 * fees, discounts, shipping and taxes.
 */
export interface CartTotals extends CurrencyInfo, Prices {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
  /** Tax lines listing each tax rate applied with the rate percentage. */
  tax_lines: Array<{ name: string; price: string; rate: string } & CurrencyInfo>;
}

/**
 * The main cart object returned by `GET /cart` and by POST actions under
 * `/cart`. It contains items, coupons, fees, shipping information and
 * aggregated totals.
 */
export interface Cart {
  items: CartItem[];
  coupons: CartCoupon[];
  fees: CartFee[];
  totals: CartTotals;
  shipping_address: ShippingAddress | null;
  billing_address: BillingAddress | null;
  /** Whether the cart requires payment to complete checkout. */
  needs_payment: boolean;
  /** Whether unknown items require shipping. */
  needs_shipping: boolean;
  /**
   * Payment requirements information. When payment is not needed this may
   * include a message explaining why.
   */
  payment_requirements: {
    is_payment_required: boolean;
    payment_required_message?: string;
    payment_methods?: string[];
  };
  /** Whether shipping rates have been calculated. */
  has_calculated_shipping: boolean;
  /** List of available shipping packages and their rates. */
  shipping_rates: CartShippingPackage[];
  items_count: number;
  items_weight: number;
  /** Cross‑sell product suggestions. Represented as an array of product IDs. */
  cross_sells: number[];
  /** unknown errors encountered while building the cart. */
  errors: Array<{ code: string; message: string }>;
  /** List of available payment method IDs (e.g. ["bacs", "cod"]). */
  payment_methods: string[];
  /** Additional extension data keyed by plugin. */
  extensions: Record<string, unknown>;
}

/* --------------------------------------------------------------------------
 * Address types
 * -------------------------------------------------------------------------- */

/**
 * Base interface for customer addresses used in billing and shipping.
 */
export interface BaseAddress {
  first_name?: string;
  last_name?: string;
  compunknown?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
}

/**
 * Shipping addresses do not include an email. All fields are optional
 * according to the update‑customer endpoint, allowing partial updates.
 */
export interface ShippingAddress extends BaseAddress {}

/**
 * Billing addresses extend the base address to include an email.
 */
export interface BillingAddress extends BaseAddress {
  email?: string;
}

/* --------------------------------------------------------------------------
 * Checkout types
 * -------------------------------------------------------------------------- */

/**
 * Result returned after payment is attempted via the checkout endpoints.
 */
export interface PaymentResult {
  payment_status: string;
  /** Provider specific details, shape varies by payment gateway. */
  payment_details?: Record<string, unknown>;
  /** URL to redirect the shopper to complete payment if required. */
  redirect_url?: string;
}

/**
 * Additional checkout fields. WooCommerce allows themes and plugins to
 * register custom fields; therefore the structure here is deliberately
 * permissive. Keys are arbitrary field names mapping to string values.
 */
export type AdditionalFields = Record<string, string | undefined>;

/**
 * Response returned by `GET /checkout` and `PUT /checkout`. This represents
 * a draft order containing current cart data and unknown information collected
 * during checkout.
 */
export interface CheckoutResponse {
  order_id: number;
  order_key: string;
  status: string;
  order_number?: string;
  customer_note: string | null;
  customer_id: number;
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  payment_method: string | null;
  /** Optional additional fields keyed by field name. */
  additional_fields?: AdditionalFields;
  /**
   * Indicates if the shopper opted to create an account during checkout. This
   * field is present only in the draft checkout response (PUT/GET) and
   * omitted in finalised orders and checkout‑order responses.
   */
  create_account?: boolean;
  /** Result of a payment attempt, present after POST requests. */
  payment_result?: PaymentResult;
  /** Embedded cart details (experimental feature). */
  __experimentalCart?: Cart;
  /** Extension data keyed by plugin. */
  extensions?: Record<string, unknown>;
}

/**
 * Body parameters for `PUT /checkout`. Used to update checkout fields prior
 * to placing the order. Only fields provided will override existing values.
 */
export interface CheckoutUpdateRequest {
  billing_address?: BillingAddress;
  shipping_address?: ShippingAddress;
  customer_note?: string;
  payment_method?: string;
  additional_fields?: AdditionalFields;
  extensions?: Record<string, unknown>;
}

/**
 * Body parameters for `POST /checkout` which finalises the order and
 * processes payment.
 */
export interface CheckoutRequest {
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  /** Note left by the customer. Optional when not provided. */
  customer_note?: string;
  /** Indicates if the shopper wishes to create an account. */
  create_account?: boolean;
  /** Chosen payment method ID. */
  payment_method: string;
  /** Array of payment data objects (key/value pairs) for the gateway. */
  payment_data?: Array<Record<string, unknown>>;
  /** Extra fields registered via blocks or themes. */
  additional_fields?: AdditionalFields;
  extensions?: Record<string, unknown>;
}

/**
 * Body parameters for `POST /checkout/{ORDER_ID}` (checkout order API).
 * This endpoint completes payment for an existing draft order. When the
 * order belongs to a guest customer, `billing_email` must be provided.
 */
export interface CheckoutOrderRequest {
  key: string;
  billing_email?: string;
  billing_address?: BillingAddress;
  shipping_address?: ShippingAddress;
  payment_method: string;
  payment_data?: Array<Record<string, unknown>>;
  customer_note?: string;
  extensions?: Record<string, unknown>;
}

/* --------------------------------------------------------------------------
 * Order entities
 * -------------------------------------------------------------------------- */

/**
 * Coupon applied to an order. Structure mirrors `CartCoupon`.
 */
export interface OrderCoupon extends CurrencyInfo {
  code: string;
  type: string;
  total_discount: string;
  total_discount_tax: string;
}

/**
 * Totals object returned for orders. In addition to the totals provided on
 * carts, orders include refund and fee data.
 */
export interface OrderTotals extends CurrencyInfo {
  subtotal: string;
  total_discount: string;
  total_shipping: string;
  total_fees: string;
  total_tax: string;
  total_refund: string;
  total_price: string;
  total_items: string;
  total_items_tax: string;
  total_fees_tax: string;
  total_discount_tax: string;
  total_shipping_tax: string;
  /** Tax line breakdown identical to cart totals. */
  tax_lines: Array<{ name: string; price: string; rate: string } & CurrencyInfo>;
}

/**
 * An item within an order. Shares munknown fields with cart items.
 */
export interface OrderItem extends BaseItem {}

/**
 * Order object returned by `/order/{id}`. Contains items, totals,
 * coupons and address information.
 */
export interface Order {
  id: number;
  status: string;
  order_key: string;
  order_number: string;
  /** Billing and shipping addresses. */
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  customer_note: string | null;
  /** Items purchased in this order. */
  items: OrderItem[];
  /** Coupons applied to this order. */
  coupons: OrderCoupon[];
  /** Aggregated totals for the order. */
  totals: OrderTotals;
  /** Whether the order still requires payment. */
  needs_payment: boolean;
  /** Whether shipping is still required. */
  needs_shipping: boolean;
  /** unknown error messages associated with the order (rare). */
  errors: Array<{ code: string; message: string }>;
  /** Payment requirement details. */
  payment_requirements: {
    is_payment_required: boolean;
    payment_required_message?: string;
    payment_methods?: string[];
  };
  /** Extension data keyed by plugin. */
  extensions?: Record<string, unknown>;
}

/* --------------------------------------------------------------------------
 * Product entities
 * -------------------------------------------------------------------------- */

/**
 * Base term used for categories, brands and tags. Includes generic fields
 * such as id, name, slug and hierarchy information.
 */
export interface Term {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  /** Number of products assigned to this term. */
  count: number;
}

/**
 * A product category extends the base term to include an image, review count
 * and permalink to the archive page.
 */
export interface ProductCategory extends Term {
  image: Image | null;
  review_count: number;
  permalink: string;
}

/**
 * A product brand extends the base term with image and review count fields.
 */
export interface ProductBrand extends Term {
  image: Image | null;
  review_count: number;
  permalink: string;
}

/**
 * A product tag uses the base term fields without additional properties.
 */
export interface ProductTag extends Term {}

/**
 * Product attribute taxonomy. Defines a custom attribute (e.g. size, color) and
 * whether it has archives on the site.
 */
export interface ProductAttribute {
  id: number;
  name: string;
  taxonomy: string;
  type: string;
  order: string;
  has_archives: boolean;
  /** Optional count of products assigned to this attribute. */
  count?: number;
}

/**
 * Individual attribute term (option) belonging to an attribute taxonomy.
 */
export interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/**
 * A product review as returned by the product reviews API.
 */
export interface ProductReview {
  id: number;
  date_created: string;
  formatted_date_created: string;
  date_created_gmt: string;
  product_id: number;
  product_name: string;
  product_permalink: string;
  /** Thumbnail image for the reviewed product. */
  product_image: Image;
  reviewer: string;
  /** HTML content of the review. */
  review: string;
  /** Rating value from 1–5. */
  rating: number;
  verified: boolean;
  /** Avatar URLs keyed by size when avatars are enabled. */
  reviewer_avatar_urls?: Record<string, string>;
}

/**
 * Counts of products within a collection grouped by rating or attribute.
 */
export interface RatingCount {
  rating: number;
  count: number;
}

export interface AttributeCount {
  term: number;
  count: number;
}

export interface TaxonomyCount {
  term: number;
  count: number;
}

export interface StockStatusCount {
  status: string;
  count: number;
}

/**
 * Response returned by `/products/collection-data`. All properties are
 * optional; only those explicitly requested via query parameters will be
 * calculated and returned.
 */
export interface ProductCollectionData {
  price_range?: PriceRange | null;
  attribute_counts?: AttributeCount[] | null;
  rating_counts?: RatingCount[] | null;
  stock_status_counts?: StockStatusCount[] | null;
  taxonomy_counts?: TaxonomyCount[] | null;
}

/**
 * A product attribute option used in the `attributes` array of a product.
 */
export interface ProductAttributeTermAssignment {
  id: number;
  name: string;
  slug: string;
  /** If present, `taxonomy` refers to the parent attribute taxonomy slug. */
  taxonomy?: string;
}

/**
 * Individual product variation returned when listing variations via the
 * Products API. Each variation includes its ID and the attributes that
 * distinguish it from the parent product.
 */
export interface ProductVariation {
  id: number;
  /** Attribute selections defining this variation. */
  attributes: VariationAttribute[];
}

export type StockStatus = 'in-stock' | 'out-of-stock' | 'on-backorder';

export interface StockAvailability {
  class: string;
  text: StockStatus;
}

/**
 * Definition of add‑to‑cart behaviour returned for products. Contains text
 * labels and quantity limits used to construct purchase buttons.
 */
export interface AddToCart {
  text: string;
  description: string;
  /** URL used to add the product to the cart (non‑API link). */
  url?: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
  /** Text shown when adding a single item. */
  single_text?: string;
}

/**
 * Main product object returned by the Products API. Reflects the structure
 * defined in ProductSchema and the API documentation. Some optional fields
 * may be omitted depending on the request parameters and context.
 */
export interface Product {
  id: number;
  name: string;
  slug: string;
  /** Parent product ID if this is a variation; 0 otherwise. */
  parent: number;
  /** Product type (simple, variable, variation, grouped, external). */
  type: string;
  /** Variation attributes defined when this product is a variation. */
  variation?: VariationAttribute[];
  permalink: string;
  short_description: string;
  description: string;
  /** SKU string for inventory management. */
  sku: string | null;
  /** Whether the product is currently on sale. */
  on_sale: boolean;
  /** Pricing information for the product. */
  prices: Prices;
  /** HTML markup for price display (e.g. "<del>$20</del> <ins>$15</ins>"). */
  price_html?: string;
  average_rating: number;
  review_count: number;
  images: Image[];
  /** List of category assignments. */
  categories?: ProductCategory[];
  /** List of tag assignments. */
  tags?: ProductTag[];
  /** List of brand assignments. */
  brands?: ProductBrand[];
  /** Attributes with their available terms and whether they are used for variations. */
  attributes?: Array<{
    id: number;
    name: string;
    taxonomy: string;
    has_variations: boolean;
    terms: ProductAttributeTermAssignment[];
  }>;
  /** IDs of associated variations when `type` is `variable`. */
  variations?: number[];
  /** IDs of grouped products when `type` is `grouped`. */
  grouped_products?: number[];
  /** Whether the product has configurable options (variations or add‑ons). */
  has_options: boolean;
  /** Whether the product can be purchased. */
  is_purchasable: boolean;
  /** Whether the product is currently in stock. */
  is_in_stock: boolean;
  /** Whether the product is available on backorder. */
  is_on_backorder: boolean;
  /** Human‑readable stock availability string (e.g. "Out of stock"). */
  stock_availability?: StockAvailability;
  /** Number of units remaining at low stock threshold; null if not low. */
  low_stock_remaining: number | null;
  /** Whether only one unit may be purchased. */
  sold_individually: boolean;
  /** Add to cart button definitions. */
  add_to_cart: AddToCart;
  /** Additional extension data keyed by plugin. */
  extensions?: Record<string, unknown>;
}

/* --------------------------------------------------------------------------
 * Request parameter interfaces
 * -------------------------------------------------------------------------- */

/**
 * Query parameters for listing products (`GET /products`). All fields are
 * optional and map directly to the parameters documented by the API.
 */
export interface ListProductsParams {
  page?: number;
  per_page?: number;
  offset?: number;
  search?: string;
  after?: string;
  before?: string;
  date_column?: string;
  exclude?: number[];
  include?: number[];
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating';
  parent?: number[];
  parent_exclude?: number[];
  type?: string;
  sku?: string;
  featured?: boolean;
  category?: number[];
  category_operator?: 'in' | 'not_in' | 'and';
  brand?: number[];
  brand_operator?: 'in' | 'not_in' | 'and';
  tag?: number[];
  tag_operator?: 'in' | 'not_in' | 'and';
  /** Arbitrary taxonomy filters: taxonomy_name=value1,value2 */
  [taxonomy: string]: unknown;
  on_sale?: boolean;
  min_price?: string;
  max_price?: string;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  rating?: number;
  attributes?: string;
  attribute_relation?: 'and' | 'or';
  catalog_visibility?: 'visible' | 'catalog' | 'search' | 'hidden';
}

/**
 * Parameters for listing product reviews (`GET /products/reviews`).
 */
export interface ListProductReviewsParams {
  page?: number;
  per_page?: number;
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'date_gmt' | 'id' | 'rating' | 'product';
  /** Comma‑separated list of category IDs to filter reviews. */
  category_id?: string;
  /** Comma‑separated list of product IDs to filter reviews. */
  product_id?: string;
}

/**
 * Parameters for listing product collection data (`GET /products/collection-data`).
 */
export interface ProductCollectionDataParams {
  calculate_price_range?: boolean;
  /**
   * When calculating attribute counts, specify an array of objects
   * containing the taxonomy slug and query type ("or" or "and").
   */
  calculate_attribute_counts?: Array<{
    taxonomy: string;
    query_type: 'or' | 'and';
  }>;
  calculate_rating_counts?: boolean;
  calculate_stock_status_counts?: boolean;
  /**
   * List of taxonomy slugs for which counts should be returned (e.g.
   * "product_cat", "product_tag").
   */
  calculate_taxonomy_counts?: string[];
  /** All list product parameters are also accepted for filtering. */
  [param: string]: unknown;
}

/**
 * Body parameters for adding a cart item via `POST /cart/add-item` or
 * `POST /cart/items`. Variation is optional for simple products.
 */
export interface AddCartItemRequest {
  id: number;
  quantity: number;
  variation?: VariationAttribute[];
  /** Additional custom data passed through filters. */
  [customParam: string]: unknown;
}

/**
 * Body parameters for removing a cart item via `POST /cart/remove-item`. Only
 * the key is required, provided either as a query parameter or in the body.
 */
export interface RemoveCartItemRequest {
  key: string;
}

/**
 * Body parameters for updating a cart item via `POST /cart/update-item` or
 * `PUT /cart/items/:key`. Quantity must be provided.
 */
export interface UpdateCartItemRequest {
  key: string;
  quantity: number;
}

/**
 * Body parameters for updating customer information via `POST /cart/update-customer`.
 */
export interface UpdateCustomerRequest {
  billing_address?: BillingAddress;
  shipping_address?: ShippingAddress;
}

/**
 * Body parameters for selecting a shipping rate via `POST /cart/select-shipping-rate`.
 */
export interface SelectShippingRateRequest {
  package_id: number;
  rate_id: string;
}

/**
 * Body parameters for applying a coupon via `POST /cart/coupons` or
 * `POST /cart/apply-coupon`.
 */
export interface ApplyCouponRequest {
  code: string;
}

/**
 * Body parameters for removing a coupon via `DELETE /cart/coupons/:code` or
 * `POST /cart/remove-coupon`.
 */
export interface RemoveCouponRequest {
  code: string;
}

/* --------------------------------------------------------------------------
 * Error handling
 * -------------------------------------------------------------------------- */

/**
 * Generic error response returned when a request fails. The Store API
 * extends the standard WordPress REST API error structure by including a
 * status code and, in some cases, the current cart state.
 */
export interface ErrorResponse {
  code: string;
  message: string;
  data?: {
    status: number;
    /**
     * When the error occurs during a cart operation, the server may return
     * the updated cart so that the client can resynchronise its state.
     */
    cart?: Cart;
  };
}

export interface ListProductsResponse {
  products: Product[];
}
