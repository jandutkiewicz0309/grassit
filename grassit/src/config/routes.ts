/**
 * Localized route table.
 *
 * The locale that is default for a domain is served without a prefix
 * (`grassit.de/produkte`); every other locale the domain offers gets one
 * (`grassit.ch/fr/produits`). A single build carries the routes for all
 * locales - the host decides which set is registered.
 */

import { ALL_LOCALES, isLocale, resolveSite, type Locale, type SiteConfig } from "./site";
import routeSlugs from "./routeSlugs.json";

export type RouteKey =
  | "home"
  | "products"
  | "product"
  | "orderSample"
  | "contact"
  | "installation"
  | "consulting"
  | "delivery"
  | "about";

interface RouteDef {
  slugs: Record<Locale, string>;
  /** Route takes a trailing `:id` segment. */
  param?: true;
  /** Only read by the sitemap generator; absent means "leave out of sitemaps". */
  sitemapPriority?: string;
}

/**
 * Kept as JSON so `scripts/generate-sitemaps.mjs` can read exactly the same
 * table the router registers - sitemaps cannot drift away from the routes.
 */
export const ROUTES = routeSlugs as unknown as Record<RouteKey, RouteDef>;

export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/**
 * Paths that shipped before the multi-domain rework and must keep resolving.
 * `/zamów-próbkę/:id` carried Polish diacritics in the URL.
 */
export const LEGACY_PATHS: { path: string; key: RouteKey; param?: true }[] = [
  { path: "/zamów-próbkę/:id", key: "orderSample", param: true },
];

export interface RouteMatch {
  key: RouteKey;
  locale: Locale;
  params: { id?: string };
}

function localePrefix(locale: Locale, site: SiteConfig): string[] {
  return locale === site.defaultLocale ? [] : [locale];
}

export function localePath(
  key: RouteKey,
  locale: Locale,
  params?: { id?: string },
  site: SiteConfig = resolveSite(),
): string {
  const def = ROUTES[key];
  const segments = [...localePrefix(locale, site)];

  const slug = def.slugs[locale];
  if (slug) segments.push(slug);

  if (def.param && params?.id) segments.push(encodeURIComponent(params.id));

  return "/" + segments.join("/");
}

export function buildRoutePaths(site: SiteConfig): { key: RouteKey; path: string }[] {
  const paths: { key: RouteKey; path: string }[] = [];

  for (const locale of site.locales) {
    for (const key of ROUTE_KEYS) {
      const def = ROUTES[key];
      const segments = [...localePrefix(locale, site)];

      const slug = def.slugs[locale];
      if (slug) segments.push(slug);
      if (def.param) segments.push(":id");

      const path = "/" + segments.join("/");
      // Locales can share a slug (e.g. `kontakt` in pl and de); register once.
      if (!paths.some((entry) => entry.path === path)) paths.push({ key, path });
    }
  }

  return paths;
}

/**
 * Reverse of {@link localePath}: work out which route a pathname refers to.
 * Used to keep the current page when the visitor switches language.
 */
export function matchPath(pathname: string, site: SiteConfig = resolveSite()): RouteMatch | undefined {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });

  let locale = site.defaultLocale;
  const head = segments[0];
  if (head && isLocale(head) && head !== site.defaultLocale && site.locales.includes(head)) {
    locale = head;
    segments.shift();
  }

  if (segments.length === 0) return { key: "home", locale, params: {} };

  const [slug, id] = segments;
  const wantsParam = segments.length > 1;

  for (const key of ROUTE_KEYS) {
    const def = ROUTES[key];
    if (key === "home") continue;
    if (def.slugs[locale] !== slug) continue;
    if (Boolean(def.param) !== wantsParam) continue;
    return { key, locale, params: wantsParam ? { id } : {} };
  }

  // A legacy path may still be in the wild or bookmarked.
  const legacy = LEGACY_PATHS.find((entry) => entry.path.split("/")[1] === slug);
  if (legacy) return { key: legacy.key, locale, params: legacy.param ? { id } : {} };

  return undefined;
}

/** Locale implied by a pathname, ignoring whether the rest of it resolves. */
export function localeFromPath(pathname: string, site: SiteConfig = resolveSite()): Locale {
  const head = pathname.split("/").filter(Boolean)[0];
  if (head && isLocale(head) && site.locales.includes(head)) return head;
  return site.defaultLocale;
}

export { ALL_LOCALES };
