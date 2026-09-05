import sites from "./sites.json";

/**
 * Domain -> market mapping.
 *
 * One build is uploaded to a single OVH document root and served for all three
 * domains, so the market is resolved at runtime from `window.location.hostname`.
 */

export type Locale = "pl" | "en" | "de" | "fr" | "it";
export type Country = "PL" | "DE" | "CH";
export type Currency = "PLN" | "EUR" | "CHF";

export interface SiteConfig {
  /** Canonical apex host, without `www.` */
  host: string;
  country: Country;
  currency: Currency;
  /** Locale served without a path prefix on this domain. */
  defaultLocale: Locale;
  /** Locales offered in the language switcher, in display order. */
  locales: readonly Locale[];
  origin: string;
  email: string;
  phone: string;
  /** Upper bound of the price filter, expressed in this site's currency. */
  priceMax: number;
}

/**
 * Kept as JSON so `scripts/generate-sitemaps.mjs` can read exactly the same
 * table the app does - the sitemaps cannot drift out of sync with the routes.
 */
export const SITE_CONFIG = sites as unknown as Record<string, SiteConfig>;

export type SiteHost = keyof typeof SITE_CONFIG;

export const SITES: readonly SiteConfig[] = Object.values(SITE_CONFIG);

export const DEFAULT_HOST = "grassit.pl";

/** Every locale the bundle ships a dictionary for. */
export const ALL_LOCALES: readonly Locale[] = ["pl", "en", "de", "fr", "it"];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (ALL_LOCALES as readonly string[]).includes(value);
}

const DEV_OVERRIDE_KEY = "grassit:site";

/**
 * `?site=de` (or `pl` / `ch` / a full host) pins the market for the rest of the
 * tab. Without it there is no way to exercise the DE/CH builds on localhost,
 * since the market is derived from the hostname.
 */
function readDevOverride(): SiteHost | undefined {
  if (typeof window === "undefined") return undefined;

  let stored: string | null = null;
  try {
    stored = window.sessionStorage.getItem(DEV_OVERRIDE_KEY);
  } catch {
    // Private mode / storage disabled - fall through to the query param.
  }

  const requested = new URLSearchParams(window.location.search).get("site") ?? stored;
  if (!requested) return undefined;

  const host = normalizeHost(requested);
  if (!host) return undefined;

  try {
    window.sessionStorage.setItem(DEV_OVERRIDE_KEY, host);
  } catch {
    // Not fatal: the override then only lasts for this navigation.
  }
  return host;
}

/** Accepts `pl`, `PL`, `grassit.pl`, `www.grassit.pl`. */
function normalizeHost(raw: string): SiteHost | undefined {
  const value = raw.trim().toLowerCase().replace(/^www\./, "");
  if (value in SITE_CONFIG) return value;

  const byCountry = SITES.find((site) => site.country.toLowerCase() === value);
  return byCountry ? (byCountry.host as SiteHost) : undefined;
}

let cached: SiteConfig | undefined;

/** The market this page belongs to. Stable for the lifetime of the document. */
export function resolveSite(): SiteConfig {
  if (cached) return cached;

  const host =
    readDevOverride() ??
    (typeof window !== "undefined" ? normalizeHost(window.location.hostname) : undefined) ??
    DEFAULT_HOST;

  cached = SITE_CONFIG[host];
  return cached;
}

export function siteByCountry(country: string): SiteConfig | undefined {
  return SITES.find((site) => site.country === country.toUpperCase());
}

/** BCP-47 tag used for `hreflang` and for `Intl` formatting. */
export function bcp47(locale: Locale, country: Country): string {
  return `${locale}-${country}`;
}

/** Open Graph wants an underscored locale from a much smaller set than BCP-47. */
export function ogLocale(locale: Locale, country: Country): string {
  return locale === "en" ? "en_GB" : `${locale}_${country}`;
}
