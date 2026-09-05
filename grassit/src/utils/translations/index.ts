import { flatten, resolveTemplate, translator, type Flatten } from "@solid-primitives/i18n";
import { createSignal } from "solid-js";
import { isLocale, resolveSite, type Locale, type SiteConfig } from "~/config/site";
import { localeFromPath, localePath, type RouteKey } from "~/config/routes";

import { pl, type Dictionary } from "./locales/pl";
import { en } from "./locales/en";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { it } from "./locales/it";

import { productsPl } from "./products/pl";
import { productsEn } from "./products/en";
import { productsDe } from "./products/de";
import { productsFr } from "./products/fr";
import { productsIt } from "./products/it";
import type { ProductText, ProductTextDict } from "./products/types";

export type { Dictionary };
export type { ProductText };

const PRODUCTS: Record<Locale, ProductTextDict> = {
  pl: productsPl,
  en: productsEn,
  de: productsDe,
  fr: productsFr,
  it: productsIt,
};

const FLAT: Record<Locale, Flatten<Dictionary>> = {
  pl: flatten(pl),
  en: flatten(en),
  de: flatten(de),
  fr: flatten(fr),
  it: flatten(it),
};

const STORAGE_KEY = "grassit:locale";

function readStoredLocale(): Locale | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function persistLocale(next: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable - the choice simply does not survive the session.
  }
}

export function preferredLocale(site: SiteConfig = resolveSite()): Locale | undefined {
  const stored = readStoredLocale();
  return stored && site.locales.includes(stored) ? stored : undefined;
}

function initialLocale(): Locale {
  const site = resolveSite();
  if (typeof window === "undefined") return site.defaultLocale;
  return localeFromPath(window.location.pathname, site);
}

const [locale, setLocaleSignal] = createSignal<Locale>(initialLocale());

export { locale };

/** Explicit choice by the visitor - remembered across visits. */
export function setLocale(next: Locale): void {
  persistLocale(next);
  setLocaleSignal(next);
}

export function syncLocaleFromRoute(next: Locale): void {
  if (next !== locale()) setLocaleSignal(next);
}

export const t = translator(() => FLAT[locale()], resolveTemplate);

export function path(key: RouteKey, params?: { id?: string }): string {
  return localePath(key, locale(), params);
}

const EMPTY_PRODUCT_TEXT: ProductText = {
  description: "",
  longDescription: "",
  material: "",
};

/** Product copy for the active locale, falling back to Polish. */
export function productText(id: string): ProductText {
  return PRODUCTS[locale()][id] ?? productsPl[id] ?? EMPTY_PRODUCT_TEXT;
}
