import { Link, Meta } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { Component, createMemo, For } from "solid-js";
import { localePath, matchPath } from "~/config/routes";
import { bcp47, ogLocale, resolveSite, SITE_CONFIG, SITES } from "~/config/site";
import { locale } from "~/utils/translations";

/**
 * Cross-domain SEO head. Mounted once in the layout, so every route gets a
 * canonical URL and the full hreflang set without repeating itself.
 *
 * The three domains serve the same catalogue for different markets; without
 * these alternates Google treats them as duplicate content.
 */
export const Seo: Component = () => {
  const location = useLocation();
  const site = resolveSite();

  const match = createMemo(() => matchPath(location.pathname, site));

  const canonical = createMemo(() => {
    const current = match();
    return current
      ? site.origin + localePath(current.key, current.locale, current.params, site)
      : site.origin + location.pathname;
  });

  const alternates = createMemo(() => {
    const current = match();
    if (!current) return [];

    return SITES.flatMap((alt) =>
      alt.locales.map((altLocale) => ({
        hreflang: bcp47(altLocale, alt.country),
        href: alt.origin + localePath(current.key, altLocale, current.params, alt),
      })),
    );
  });

  const xDefault = createMemo(() => {
    const current = match();
    if (!current) return undefined;
    const fallback = SITE_CONFIG["grassit.pl"];
    return fallback.origin + localePath(current.key, "en", current.params, fallback);
  });

  return (
    <>
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="Grassit" />
      <Meta property="og:locale" content={ogLocale(locale(), site.country)} />
      <Meta property="og:url" content={canonical()} />
      <Link rel="canonical" href={canonical()} />
      <For each={alternates()}>
        {(alternate) => (
          <Link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
        )}
      </For>
      {xDefault() && <Link rel="alternate" hreflang="x-default" href={xDefault()!} />}
    </>
  );
};
