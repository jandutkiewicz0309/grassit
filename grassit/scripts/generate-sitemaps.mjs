/**
 * Writes one sitemap and one robots.txt per domain into public/.
 *
 * All three domains share a single OVH document root, so .htaccess picks the
 * right file by Host. Reads the same JSON tables the app does, so the sitemaps
 * cannot drift away from the routes.
 *
 * Run via `pnpm prebuild` (automatic) or `pnpm sitemaps`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

const SITES = readJson("src/config/sites.json");
const ROUTES = readJson("src/config/routeSlugs.json");
const { products } = readJson("src/data/product.json");

const visibleProducts = products.filter((product) => !product.hidden);
const allSites = Object.values(SITES);

/** Mirrors localePath() in src/config/routes.ts. */
function localePath(key, locale, site, id) {
  const def = ROUTES[key];
  const segments = [];
  if (locale !== site.defaultLocale) segments.push(locale);
  if (def.slugs[locale]) segments.push(def.slugs[locale]);
  if (def.param && id) segments.push(encodeURIComponent(id));
  return "/" + segments.join("/");
}

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Every (site, locale) pair that serves this page, for the hreflang block. */
function alternates(key, id) {
  return allSites.flatMap((site) =>
    site.locales.map((locale) => ({
      hreflang: `${locale}-${site.country}`,
      href: site.origin + localePath(key, locale, site, id),
    })),
  );
}

function urlEntry(site, key, locale, priority, id) {
  const links = alternates(key, id)
    .map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}" />`,
    )
    .join("\n");

  return [
    "  <url>",
    `    <loc>${escapeXml(site.origin + localePath(key, locale, site, id))}</loc>`,
    links,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemap(site) {
  const entries = [];

  for (const [key, def] of Object.entries(ROUTES)) {
    if (!def.sitemapPriority) continue;

    for (const locale of site.locales) {
      if (def.param) {
        for (const product of visibleProducts) {
          entries.push(urlEntry(site, key, locale, def.sitemapPriority, product.id));
        }
      } else {
        entries.push(urlEntry(site, key, locale, def.sitemapPriority));
      }
    }
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

const buildRobots = (site) =>
  ["User-agent: *", "Allow: /", "", `Sitemap: ${site.origin}/sitemap.xml`, ""].join("\n");

for (const site of allSites) {
  const suffix = site.country.toLowerCase();
  writeFileSync(join(root, `public/sitemap-${suffix}.xml`), buildSitemap(site), "utf8");
  writeFileSync(join(root, `public/robots-${suffix}.txt`), buildRobots(site), "utf8");
  console.log(`sitemap-${suffix}.xml + robots-${suffix}.txt  (${site.origin})`);
}
