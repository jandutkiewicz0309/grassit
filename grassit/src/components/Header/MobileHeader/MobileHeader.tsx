import { Component, Show, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "solid-icons/ai";
import { FiPackage, FiTool, FiMail, FiLayers, FiActivity, FiGrid, FiSettings, FiMessageCircle, FiTruck } from "solid-icons/fi";
import "./MobileHeader.css";
import grassit from "~/components/static/png/grassit_logo.png"

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

  return (
    <header class="MobileHeader">
      <div class="mh__bar">
        <A href="/" class="mh__brand" aria-label="Grassit – strona główna">
          <img src={grassit} class="mobile_img" alt="Grassit" width="1336" height="884" />
        </A>
        <button
          class="mh__hamburger"
          type="button"
          aria-label={open() ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open()}
          onClick={toggle}
        >
          {open() ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </div>

      <Show when={open()}>
        <div
          class="mh__overlay"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div class="mh__sheet" onClick={(e) => e.stopPropagation()}>
            <div class="mh__sheet-header">
              <img src={grassit} class="mh__sheet-logo" alt="" width="1336" height="884" />
              <button class="mh__closeBtn" aria-label="Zamknij" onClick={close}>
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
                    <span>Produkty</span>
                  </div>
                  <AiOutlineDown size={16} class="mh__chev" />
                </button>

                <Show when={openProdukty()}>
                  <div class="mh__group">
                    <A
                      href="/produkty?category=Trawy Dekoracyjne"
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      <FiLayers size={15} class="mh__link-icon" />
                      Trawy Dekoracyjne
                    </A>
                    <A
                      href="/produkty?category=Trawy sportowe"
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      <FiActivity size={15} class="mh__link-icon" />
                      Trawy Sportowe
                    </A>
                    <A
                      href="/produkty?category=Akcesoria"
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      <FiGrid size={15} class="mh__link-icon" />
                      Akcesoria
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
                    <span>Usługi</span>
                  </div>
                  <AiOutlineDown size={16} class="mh__chev" />
                </button>

                <Show when={openUslugi()}>
                  <div class="mh__group">
                    <A href="montaz" class="mh__link" onClick={onNavClick}>
                      <FiSettings size={15} class="mh__link-icon" />
                      Montaż
                    </A>
                    <A href="doradztwo" class="mh__link" onClick={onNavClick}>
                      <FiMessageCircle size={15} class="mh__link-icon" />
                      Doradztwo
                    </A>
                    <A href="dostawa" class="mh__link" onClick={onNavClick}>
                      <FiTruck size={15} class="mh__link-icon" />
                      Dostawa
                    </A>
                  </div>
                </Show>
              </div>

              <div class="mh__divider" />

              <A
                href="/kontakt"
                class="mh__cta"
                onClick={onNavClick}
              >
                <FiMail size={18} />
                Kontakt
              </A>
            </nav>
          </div>
        </div>
      </Show>
    </header>
  );
};
