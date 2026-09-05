export interface ProductText {
  /** Short blurb shown on cards and used as the meta description. */
  description: string;
  /** Full marketing copy on the product detail page. */
  longDescription: string;
  /** Fibre / backing composition shown in the spec table. */
  material: string;
}

export type ProductTextDict = Record<string, ProductText>;
