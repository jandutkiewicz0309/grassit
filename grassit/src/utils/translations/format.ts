import { bcp47, resolveSite, type Currency, type Locale, type SiteConfig } from "~/config/site";
import { locale } from "./index";

export type PriceMap = Partial<Record<Currency, number>> | null;

/** Amount for this domain's currency, or `null` when the product is quote-only. */
export function priceFor(price: PriceMap, site: SiteConfig = resolveSite()): number | null {
  if (!price) return null;
  const value = price[site.currency];
  return typeof value === "number" ? value : null;
}

function numberFormat(options: Intl.NumberFormatOptions, site: SiteConfig, current: Locale) {
  return new Intl.NumberFormat(bcp47(current, site.country), options);
}

/** e.g. `89,00 zł` / `20,50 €` / `CHF 19.00` */
export function formatPrice(
  value: number,
  site: SiteConfig = resolveSite(),
  current: Locale = locale(),
): string {
  return numberFormat(
    { style: "currency", currency: site.currency, minimumFractionDigits: 2 },
    site,
    current,
  ).format(value);
}

/** Bare currency symbol, for compact labels like the price-filter heading. */
export function currencySymbol(
  site: SiteConfig = resolveSite(),
  current: Locale = locale(),
): string {
  const parts = numberFormat(
    { style: "currency", currency: site.currency, minimumFractionDigits: 0 },
    site,
    current,
  ).formatToParts(0);
  return parts.find((part) => part.type === "currency")?.value ?? site.currency;
}

export function formatHeight(mm: number, site: SiteConfig = resolveSite(), current: Locale = locale()) {
  return `${numberFormat({ maximumFractionDigits: 0 }, site, current).format(mm)} mm`;
}

export function formatWeight(
  gsm: number,
  approx: boolean,
  site: SiteConfig = resolveSite(),
  current: Locale = locale(),
) {
  const value = numberFormat({ maximumFractionDigits: 0 }, site, current).format(gsm);
  return `${approx ? "± " : ""}${value} g/m²`;
}
