import { Component, For, createSignal, onMount } from "solid-js";
import "./Faq.css";

type QA = { q: string; a: string };

const DATA: QA[] = [
  {
    q: "Jak wygląda pielęgnacja sztucznej trawy?",
    a: "Wystarczy okresowe wyczesanie, usunięcie liści i przepłukanie wodą. W strefach intensywnych można dodać wypełnienie i podnieść włókna szczotką.",
  },
  {
    q: "Co z odprowadzaniem wody podczas deszczu?",
    a: "Podłoże jest perforowane, dzięki czemu woda szybko przesiąka do warstwy drenażowej. Przy właściwie przygotowanej podsypce nie tworzą się zastoiska.",
  },
  {
    q: "Jak długo może służyć sztuczna trawa?",
    a: "Żywotność zależy od klasy produktu i intensywności użytkowania. Dobre trawy ogrodowe zachowują estetykę nawet 10–15 lat; w miejscach mocno eksploatowanych okres ten bywa krótszy.",
  },
  {
    q: "Czy sztuczna trawa jest bezpieczna dla dzieci i zwierząt?",
    a: "Tak. Produkty są wolne od ołowiu i toksyn, a miękkie włókna minimalizują ryzyko otarć. Zalecamy regularne płukanie w strefach zabawy.",
  },
];

const Faq: Component = () => {
  const [openIdx, setOpenIdx] = createSignal<number | null>(0); // pierwszy otwarty
  let panels: HTMLDivElement[] = [];

  // pomocnicze: ustaw maxHeight dla animacji
  const recalcHeights = () => {
    panels.forEach((el, i) => {
      const opened = openIdx() === i;
      el.style.maxHeight = opened ? `${el.scrollHeight}px` : "0px";
    });
  };

  onMount(() => {
    // po pierwszym renderze ustaw wysokości
    queueMicrotask(recalcHeights);
    // gdy okno zmienia rozmiar, przelicz otwarty panel
    window.addEventListener("resize", recalcHeights);
  });

  const toggle = (i: number) => {
    setOpenIdx((curr) => (curr === i ? null : i));
    // po zmianie sygnału daj przeglądarce cykl i przelicz wysokości
    queueMicrotask(recalcHeights);
  };

  return (
    <section class="faq">
      <div class="faq__inner">
        <h2 class="faq__title">Często zadawane pytania</h2>

        <div class="faq__list" role="list">
          <For each={DATA}>
            {(item, i) => (
              <div class="faqItem" role="listitem">
                <h3 class="faqItem__head">
                  <button
                    type="button"
                    class="faqItem__btn"
                    aria-expanded={openIdx() === i()}
                    aria-controls={`faq-panel-${i()}`}
                    id={`faq-button-${i()}`}
                    onClick={() => toggle(i())}
                  >
                    <span>{item.q}</span>
                    <svg
                      class={`chev ${openIdx() === i() ? "chev--open" : ""}`}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M7.4 8.6 12 13.2l4.6-4.6 1.4 1.4L12 16 6 10l1.4-1.4Z"
                      />
                    </svg>
                  </button>
                </h3>

                <div
                  ref={(el) => (panels[i()] = el)}
                  id={`faq-panel-${i()}`}
                  role="region"
                  aria-labelledby={`faq-button-${i()}`}
                  class="faqItem__panel"
                >
                  <div class="faqItem__content">{item.a}</div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default Faq;
