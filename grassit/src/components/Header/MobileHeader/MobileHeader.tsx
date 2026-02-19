import { Component, Show, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "solid-icons/ai";
import "./MobileHeader.css";
import grassit from "~/components/static/jpg/grassit.svg"
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
        <A href="/" class="mh__brand">
          <img src={grassit} class="mobile_img"/>
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
            <button class="mh__closeBtn" aria-label="Zamknij" onClick={close}>
              <AiOutlineClose size={22} />
            </button>

            <nav class="mh__nav">
              <button
                class={`mh__sectionTitle mh__expander ${
                  openProdukty() ? "is-open" : ""
                }`}
                aria-expanded={openProdukty()}
                onClick={() => setOpenProdukty((v) => !v)}
              >
                <span>PRODUKTY</span>
                <AiOutlineDown size={18} class="mh__chev" />
              </button>

              <Show when={openProdukty()}>
                <div class="mh__group">
                  <A
                    href="/produkty?category=Trawy Dekoracyjne"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Trawy Dekoracyjne
                  </A>
                  <A
                    href="/produkty?category=Trawy sportowe"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Trawy Sportowe
                  </A>
                  <A
                    href="/produkty?category=Akcesoria"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Akcesoria
                  </A>
                </div>
              </Show>
              <button
                class={`mh__sectionTitle mh__expander ${
                  openUslugi() ? "is-open" : ""
                }`}
                aria-expanded={openUslugi()}
                onClick={() => setOpenUslugi((v) => !v)}
              >
                <span>USŁUGI</span>
                <AiOutlineDown size={18} class="mh__chev" />
              </button>
              <Show when={openUslugi()}>
                <div class="mh__group">
                  <A href="montaz" class="mh__link" onClick={onNavClick}>
                    Montaż
                  </A>
                  <A href="doradztwo" class="mh__link" onClick={onNavClick}>
                    Doradztwo
                  </A>
                  <A href="dostawa" class="mh__link" onClick={onNavClick}>
                    Dostawa
                  </A>
                </div>
              </Show>

              {/* <A
                href="/realizacje"
                class="mh__sectionTitle is-link"
                onClick={onNavClick}
              >
                REALIZACJE
              </A> */}
              <A
                href="/kontakt"
                class="mh__sectionTitle is-link"
                onClick={onNavClick}
              >
                KONTAKT
              </A>
            </nav>
          </div>
        </div>
      </Show>
    </header>
  );
};
