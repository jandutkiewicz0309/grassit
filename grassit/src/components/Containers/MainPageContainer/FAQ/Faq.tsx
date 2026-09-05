import { Component, For, createEffect, createMemo, createSignal, onMount } from "solid-js";
import "./Faq.css";
import { locale, t } from "~/utils/translations";

type QA = { q: string; a: string };

const Faq: Component = () => {
  const [openIdx, setOpenIdx] = createSignal<number | null>(0);
  let panels: HTMLDivElement[] = [];

  const items = createMemo<QA[]>(() => [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ]);

  const recalcHeights = () => {
    panels.forEach((el, i) => {
      if (!el) return;
      const opened = openIdx() === i;
      el.style.maxHeight = opened ? `${el.scrollHeight}px` : "0px";
    });
  };

  onMount(() => {
    queueMicrotask(recalcHeights);
    window.addEventListener("resize", recalcHeights);
  });

  // Answers differ in length between languages, so the measured panel height
  // has to be taken again after a language change.
  createEffect(() => {
    locale();
    queueMicrotask(recalcHeights);
  });

  const toggle = (i: number) => {
    setOpenIdx((curr) => (curr === i ? null : i));
    queueMicrotask(recalcHeights);
  };

  return (
    <section class="faq">
      <div class="faq__inner">
        <h2 class="faq__title">{t("faq.heading")}</h2>
        <div class="faq__list" role="list">
          <For each={items()}>
            {(item, i) => (
              <div class="faqItem" role="listitem">
                <p class="faqItem__head">
                  <button
                    type="button"
                    class="faqItem__btn"
                    aria-expanded={openIdx() === i()}
                    aria-controls={`faq-panel-${i()}`}
                    id={`faq-button-${i()}`}
                    onClick={() => toggle(i())}
                  >
                    <span>{item.q}</span>
                  </button>
                </p>
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
