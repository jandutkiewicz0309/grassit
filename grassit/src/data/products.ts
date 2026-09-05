import raw from "./product.json";
import type { Currency } from "~/config/site";

export type CategoryType = "trawy_dekoracyjne" | "trawy_sportowe" | "akcesoria";
export type SubcategoryType =
  | "murawy_piłkarskie"
  | "murawy_padlowe"
  | "murawy_golfowe"
  | "murawy_tenis";

/** `null` means the product is quote-only. */
export type PriceMap = Record<Currency, number> | null;

export interface ProductSpecs {
  producer: string;
  catalogNumber?: string;
  heightMm: number;
  weightGsm: number;
  weightApprox: boolean;
  uvResistant: boolean;
}

export interface ProductColorVariant {
  id: string;
  color: string;
  /** Key under `product.*` in the UI dictionary, e.g. `colorGreen`. */
  labelKey: string;
}

export interface Product {
  id: string;
  category: CategoryType;
  subcategory?: SubcategoryType;
  hidden?: boolean;
  technicalCard?: string;
  img: string;
  images?: string[];
  nameProduct: string;
  /** Key under `product.*` in the UI dictionary, e.g. `badgeBestseller`. */
  badge?: string;
  price: PriceMap;
  colorVariants?: ProductColorVariant[];
  specs: ProductSpecs;
}

/**
 * The JSON is bundled at build time; this module is the one place that asserts
 * its shape, so the rest of the app never needs an `as any` cast.
 */
export const PRODUCTS = raw.products as unknown as Product[];

export const VISIBLE_PRODUCTS = PRODUCTS.filter((product) => !product.hidden);

export function findProduct(id: string | undefined): Product | undefined {
  if (!id) return undefined;
  return PRODUCTS.find((product) => product.id === id);
}

export function similarProducts(current: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (product) =>
      product.category === current.category && product.id !== current.id && !product.hidden,
  ).slice(0, limit);
}

export const CATEGORY_VALUES: CategoryType[] = [
  "trawy_dekoracyjne",
  "trawy_sportowe",
  "akcesoria",
];

export const SUBCATEGORY_VALUES: SubcategoryType[] = [
  "murawy_piłkarskie",
  "murawy_padlowe",
  "murawy_golfowe",
  "murawy_tenis",
];

export function isCategory(value: unknown): value is CategoryType {
  return typeof value === "string" && (CATEGORY_VALUES as string[]).includes(value);
}
