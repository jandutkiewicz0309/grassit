import { Component, For } from "solid-js";
import { A } from "@solidjs/router";
import "./Consulting.css";
import doradztwoImg from "~/components/static/png/consulting.png";
import { path, t } from "~/utils/translations";

export const ConsultingPage: Component = () => {
  const items = () => [
    t("consulting.item1"),
    t("consulting.item2"),
    t("consulting.item3"),
    t("consulting.item4"),
  ];

  return (
    <section class="doradztwo">
      <div class="doradztwo__grid">
        <div class="doradztwo__media">
          <img src={doradztwoImg} alt={t("consulting.imgAlt")} loading="lazy" />
        </div>

        <div class="doradztwo__content">
          <h1 class="doradztwo__title">{t("consulting.title")}</h1>

          <p class="doradztwo__lead">{t("consulting.lead")}</p>

          <p class="doradztwo__subtitle">{t("consulting.helpTitle")}</p>
          <ul class="doradztwo__list">
            <For each={items()}>{(item) => <li>{item}</li>}</For>
          </ul>

          <p class="doradztwo__subtitle">{t("consulting.processTitle")}</p>
          <p class="doradztwo__text">{t("consulting.processText")}</p>

          <A href={path("contact")} class="doradztwo__cta">
            {t("common.contactUs")}
          </A>
        </div>
      </div>
    </section>
  );
};
