import { Component, For } from "solid-js";
import { A } from "@solidjs/router";
import "./Installation.css";
import instalationImg from "~/components/static/png/instalationImg.jpg";
import { path, t } from "~/utils/translations";

export const InstallationPage: Component = () => {
  const items = () => [
    t("installation.item1"),
    t("installation.item2"),
    t("installation.item3"),
    t("installation.item4"),
    t("installation.item5"),
  ];

  return (
    <section class="montaz">
      <div class="montaz__grid">
        <div class="montaz__media">
          <img src={instalationImg} alt={t("installation.imgAlt")} loading="lazy" />
        </div>

        <div class="montaz__content">
          <h1 class="montaz__title">{t("installation.title")}</h1>

          <p class="montaz__lead">{t("installation.lead")}</p>

          <p class="montaz__intro">{t("installation.intro")}</p>
          <ul class="montaz__list">
            <For each={items()}>{(item) => <li>{item}</li>}</For>
          </ul>

          <p class="montaz__note">{t("installation.note")}</p>

          <A href={path("contact")} class="montaz__cta">
            {t("common.contactUs")}
          </A>
        </div>
      </div>
    </section>
  );
};
