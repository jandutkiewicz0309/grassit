import { Component, Show, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "solid-icons/ai";
import {
  FiPackage,
  FiTool,
  FiMail,
  FiLayers,
  FiActivity,
  FiGrid,
  FiSettings,
  FiMessageCircle,
  FiTruck,
} from "solid-icons/fi";
import "./MobileHeader.css";
import grassit from "~/components/static/jpg/grassit.svg";
import { LanguageSwitcher } from "~/components/LanguageSwitcher/LanguageSwitcher";
import { path, t } from "~/utils/translations";

export const MobileHeader: Component = () => {
  const [open, setOpen] = createSignal(false);
  const [openProdukty, setOpenProdukty] = createSignal(false);
  const [openUslugi, setOpenUslugi] = createSignal(false);

  const lockScroll = () => (document.body.style.overflow = "hidden");
  const unlockScroll = () => (document.body.style.overflow = "");

  const close = () => {
    setOpen(false);
    unlockScroll();
  };
  const toggle = () => {
    const next = !open();
    setOpen(next);
    next ? lockScroll() : unlockScroll();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  onMount(() => {
    document.addEventListener("keydown", onKey);
  });
  onCleanup(() => {
    document.removeEventListener("keydown", onKey);
    unlockScroll();
  });

  const onNavClick = () => close();

  /** Category deep-links carry the technical slug, never a translated label. */
  const categoryHref = (category: string) => `${path("products")}?category=${category}`;

  return (
    <header class="MobileHeader">
      <div class="mh__bar">
        <A href={path("home")} class="mh__brand" aria-label={t("nav.home")}>
          <img src={grassit} class="mobile_img" alt="Grassit" />
        </A>
        <button
          class="mh__hamburger"
          type="button"
          aria-label={open() ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={open()}
          onClick={toggle}
        >
          {open() ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </div>

      <Show when={open()}>
        <div class="mh__overlay" role="dialog" aria-modal="true" onClick={close}>
          <div class="mh__sheet" onClick={(e) => e.stopPropagation()}>
            <div class="mh__sheet-header">
              <img src={grassit} class="mh__sheet-logo" alt="Grassit" />
              <button class="mh__closeBtn" aria-label={t("common.close")} onClick={close}>
                <AiOutlineClose size={20} />
              </button>
            </div>

            <nav class="mh__nav">
              <div class="mh__section">
                <button
                  class={`mh__expander ${openProdukty() ? "is-open" : ""}`}
                  aria-expanded={openProdukty()}
                  onClick={() => setOpenProdukty((v) => !v)}
                >
                  <div class="mh__expander-left">
                    <span class="mh__expander-icon">
                      <FiPackage size={18} />
                    </span>
                    <span>{t("nav.products")}</span>
                  </div>
                  <AiOutlineDown size={16} class="mh__chev" />
                </button>

                <Show when={openProdukty()}>
                  <div class="mh__group">
                    <A
                      href={categoryHref("trawy_dekoracyjne")}
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      <FiLayers size={15} class="mh__link-icon" />
                      {t("nav.decorative")}
                    </A>
                    <A
                      href={categoryHref("trawy_sportowe")}
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      <FiActivity size={15} class="mh__link-icon" />
                      {t("nav.sport")}
                    </A>
                    <A href={categoryHref("akcesoria")} class="mh__link" onClick={onNavClick}>
                      <FiGrid size={15} class="mh__link-icon" />
                      {t("nav.accessories")}
                    </A>
                  </div>
                </Show>
              </div>

              <div class="mh__section">
                <button
                  class={`mh__expander ${openUslugi() ? "is-open" : ""}`}
                  aria-expanded={openUslugi()}
                  onClick={() => setOpenUslugi((v) => !v)}
                >
                  <div class="mh__expander-left">
                    <span class="mh__expander-icon">
                      <FiTool size={18} />
                    </span>
                    <span>{t("nav.services")}</span>
                  </div>
                  <AiOutlineDown size={16} class="mh__chev" />
                </button>

                <Show when={openUslugi()}>
                  <div class="mh__group">
                    <A href={path("installation")} class="mh__link" onClick={onNavClick}>
                      <FiSettings size={15} class="mh__link-icon" />
                      {t("nav.installation")}
                    </A>
                    <A href={path("consulting")} class="mh__link" onClick={onNavClick}>
                      <FiMessageCircle size={15} class="mh__link-icon" />
                      {t("nav.consulting")}
                    </A>
                    <A href={path("delivery")} class="mh__link" onClick={onNavClick}>
                      <FiTruck size={15} class="mh__link-icon" />
                      {t("nav.delivery")}
                    </A>
                  </div>
                </Show>
              </div>

              <div class="mh__divider" />

              <A href={path("contact")} class="mh__cta" onClick={onNavClick}>
                <FiMail size={18} />
                {t("nav.contact")}
              </A>

              <div class="mh__lang">
                <LanguageSwitcher variant="block" onSelect={close} />
              </div>
            </nav>
          </div>
        </div>
      </Show>
    </header>
  );
};
