import { Component, Show, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "solid-icons/ai";
import "./MobileHeader.css";

export const MobileHeader: Component = () => {
  const [open, setOpen] = createSignal(false);
  const [openProdukty, setOpenProdukty] = createSignal(false);
  const [openUslugi, setOpenUslugi] = createSignal(false);

  // Body scroll lock
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

  // ESC to close
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
      {/* Pasek górny */}
      <div class="mh__bar">
        <A href="/" class="mh__brand">
          grassit
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

      {/* FULLSCREEN OVERLAY MENU */}
      <Show when={open()}>
        <div
          class="mh__overlay"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          {/* Zatrzymaj propagację, by klik wewnątrz nie zamykał */}
          <div class="mh__sheet" onClick={(e) => e.stopPropagation()}>
            <button class="mh__closeBtn" aria-label="Zamknij" onClick={close}>
              <AiOutlineClose size={22} />
            </button>

            <nav class="mh__nav">
              {/* PRODUKTY */}
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
                  <div class="mh__item">
                    <A
                      href="/produkty/trawy-krajobrazowe"
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      Trawy krajobrazowe
                    </A>
                    <div class="mh__sublist">
                      <A
                        href="/produkty/trawy-krajobrazowe/ogrod"
                        class="mh__sublink"
                        onClick={onNavClick}
                      >
                        Ogród
                      </A>
                      <A
                        href="/produkty/trawy-krajobrazowe/plac-zabaw"
                        class="mh__sublink"
                        onClick={onNavClick}
                      >
                        Plac zabaw
                      </A>
                    </div>
                  </div>

                  <div class="mh__item">
                    <A
                      href="/produkty/trawy-sportowe"
                      class="mh__link"
                      onClick={onNavClick}
                    >
                      Trawy sportowe
                    </A>
                    <div class="mh__sublist">
                      <A
                        href="/produkty/trawy-sportowe/pilka-nozna"
                        class="mh__sublink"
                        onClick={onNavClick}
                      >
                        Piłka nożna
                      </A>
                      <A
                        href="/produkty/trawy-sportowe/tenis"
                        class="mh__sublink"
                        onClick={onNavClick}
                      >
                        Tenis
                      </A>
                    </div>
                  </div>

                  <A
                    href="/produkty/akcesoria"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Akcesoria
                  </A>
                </div>
              </Show>

              {/* USŁUGI */}
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
                  <A
                    href="/uslugi/montaz"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Montaż
                  </A>
                  <A
                    href="/uslugi/kalkulator"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Kalkulator
                  </A>
                  <A
                    href="/uslugi/doradztwo"
                    class="mh__link"
                    onClick={onNavClick}
                  >
                    Doradztwo
                  </A>
                </div>
              </Show>

              <A
                href="/realizacje"
                class="mh__sectionTitle is-link"
                onClick={onNavClick}
              >
                REALIZACJE
              </A>
              <A
                href="/kontakt"
                class="mh__sectionTitle is-link"
                onClick={onNavClick}
              >
                KONTAKT
              </A>
            </nav>

            <A href="/popros-o-probke" class="mh__cta" onClick={onNavClick}>
              Poproś o próbkę
            </A>
          </div>
        </div>
      </Show>
    </header>
  );
};
