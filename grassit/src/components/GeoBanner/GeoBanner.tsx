import { useLocation } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";
import { AiOutlineClose } from "solid-icons/ai";
import { TbWorld } from "solid-icons/tb";
import { localePath, matchPath } from "~/config/routes";
import { resolveSite, siteByCountry, type SiteConfig } from "~/config/site";
import { t } from "~/utils/translations";
import "./GeoBanner.css";

const GEO_ENDPOINT = "https://get.geojs.io/v1/ip/country.json";
const DISMISS_KEY = "grassit:geo-dismissed";

export const GeoBanner: Component = () => {
  const site = resolveSite();
  const location = useLocation();
  const [suggestion, setSuggestion] = createSignal<SiteConfig | undefined>();

  const dismiss = () => {
    setSuggestion(undefined);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Storage unavailable - the banner simply reappears next visit.
    }
  };

  onMount(async () => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY)) return;
    } catch {
    }

    try {
      const response = await fetch(GEO_ENDPOINT);
      if (!response.ok) return;

      const data = (await response.json()) as { country?: string };
      if (!data.country) return;

      const target = siteByCountry(data.country);
      if (target && target.host !== site.host) setSuggestion(target);
    } catch {
      // Offline, blocked by an ad blocker, rate limited - stay silent.
    }
  });

  const targetHref = (target: SiteConfig) => {
    const current = matchPath(location.pathname, site);
    const path = current
      ? localePath(current.key, target.defaultLocale, current.params, target)
      : "/";
    return target.origin + path;
  };

  return (
    <Show when={suggestion()}>
      {(target) => (
        <div class="geoBanner" role="region" aria-label={t("lang.label")}>
          <div class="geoBanner__inner">
            <TbWorld size={18} class="geoBanner__icon" aria-hidden="true" />
            <span class="geoBanner__text">
              {t("geo.message", { country: t(`geo.${target().country}` as "geo.PL") })}
            </span>
            <a class="geoBanner__cta" href={targetHref(target())}>
              {t("geo.goTo", { host: target().host })}
            </a>
            <button type="button" class="geoBanner__stay" onClick={dismiss}>
              {t("geo.stay")}
            </button>
            <button
              type="button"
              class="geoBanner__close"
              aria-label={t("geo.dismiss")}
              onClick={dismiss}
            >
              <AiOutlineClose size={16} />
            </button>
          </div>
        </div>
      )}
    </Show>
  );
};
