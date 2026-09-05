import { useLocation, useNavigate } from "@solidjs/router";
import { Component, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { AiOutlineDown } from "solid-icons/ai";
import { TbWorld } from "solid-icons/tb";
import { localePath, matchPath } from "~/config/routes";
import { resolveSite, type Locale } from "~/config/site";
import { locale, setLocale, t } from "~/utils/translations";
import "./LanguageSwitcher.css";

const SHORT: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
  de: "DE",
  fr: "FR",
  it: "IT",
};

export interface LanguageSwitcherProps {
  /** `bar` is the compact header pill, `block` the stacked mobile-menu list. */
  variant?: "bar" | "block";
  onSelect?: () => void;
}

export const LanguageSwitcher: Component<LanguageSwitcherProps> = (props) => {
  const site = resolveSite();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = createSignal(false);

  let root: HTMLDivElement | undefined;

  const onDocumentClick = (event: MouseEvent) => {
    if (root && !root.contains(event.target as Node)) setOpen(false);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
  };

  onMount(() => {
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKey);
  });
  onCleanup(() => {
    document.removeEventListener("click", onDocumentClick);
    document.removeEventListener("keydown", onKey);
  });

  const choose = (next: Locale) => {
    setOpen(false);
    props.onSelect?.();
    if (next === locale()) return;

    setLocale(next);

    // Keep the visitor on the page they were reading, in the new language.
    const current = matchPath(location.pathname, site);
    const target = current
      ? localePath(current.key, next, current.params, site)
      : localePath("home", next, undefined, site);

    navigate(target + location.search, { replace: false });
  };

  return (
    <Show when={site.locales.length > 1}>
      <div
        ref={root}
        class={`langSwitch langSwitch--${props.variant ?? "bar"}`}
        classList={{ "is-open": open() }}
      >
        <button
          type="button"
          class="langSwitch__btn"
          aria-haspopup="listbox"
          aria-expanded={open()}
          aria-label={t("lang.label")}
          onClick={() => setOpen((value) => !value)}
        >
          <TbWorld size={16} aria-hidden="true" />
          <span class="langSwitch__current">{SHORT[locale()]}</span>
          <AiOutlineDown size={12} class="langSwitch__chev" aria-hidden="true" />
        </button>

        <Show when={open()}>
          <ul class="langSwitch__menu" role="listbox" aria-label={t("lang.label")}>
            <For each={site.locales}>
              {(option) => (
                <li>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option === locale()}
                    class="langSwitch__option"
                    classList={{ "is-active": option === locale() }}
                    onClick={() => choose(option)}
                  >
                    <span class="langSwitch__code">{SHORT[option]}</span>
                    <span>{t(`lang.${option}` as "lang.pl")}</span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </Show>
  );
};
