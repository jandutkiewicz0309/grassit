import { Component, For } from "solid-js";
import { A } from "@solidjs/router";
import "./Delivery.css";
import delivery from "~/components/static/png/delivery.png";
import { path, t } from "~/utils/translations";

export const DeliveryPage: Component = () => {
  const steps = () => [
    { title: t("delivery.step1Title"), text: t("delivery.step1Text") },
    { title: t("delivery.step2Title"), text: t("delivery.step2Text") },
    { title: t("delivery.step3Title"), text: t("delivery.step3Text") },
  ];

  return (
    <section class="dostawa">
      <div class="dostawa__grid">
        <div class="dostawa__media">
          <img src={delivery} alt={t("delivery.imgAlt")} loading="lazy" />
        </div>

        <div class="dostawa__content">
          <h1 class="dostawa__title">{t("delivery.title")}</h1>

          <p class="dostawa__lead">{t("delivery.lead")}</p>

          <p class="dostawa__subtitle">{t("delivery.stepsTitle")}</p>
          <ol class="dostawa__list dostawa__list--ol">
            <For each={steps()}>
              {(step) => (
                <li>
                  <strong>{step.title}</strong> — {step.text}
                </li>
              )}
            </For>
          </ol>

          <p class="dostawa__text">{t("delivery.note")}</p>

          <A href={path("contact")} class="dostawa__cta">
            {t("common.contactUs")}
          </A>
        </div>
      </div>
    </section>
  );
};
