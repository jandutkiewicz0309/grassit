import { Component, For, createMemo } from "solid-js";
import lawnImg from "~/components/static/png/NaturalInspiredLawn.jpg";
import "./Sustainability.css";
import truck from "~/components/static/png/truck.png";
import warranty from "~/components/static/png/warranty.png";
import { t } from "~/utils/translations";

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#16a34a" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const Sustainability: Component = () => {
  const items = createMemo(() => [
    { title: t("sustainability.toxinsTitle"), desc: t("sustainability.toxinsDesc") },
    { title: t("sustainability.waterTitle"), desc: t("sustainability.waterDesc") },
    { title: t("sustainability.recyclingTitle"), desc: t("sustainability.recyclingDesc") },
  ]);

  return (
    <section class="sust">
      <div class="sust__inner">
        <div class="sust__media">
          <img
            class="sust__img"
            src={lawnImg}
            alt={t("sustainability.imgAlt")}
            loading="lazy"
          />
        </div>
        <div class="sust__content">
          <h2 class="sust__title">{t("sustainability.title")}</h2>
          <p class="sust__lead">{t("sustainability.lead")}</p>
          <ul class="sust__list">
            <For each={items()}>
              {(item) => (
                <li class="sust__item">
                  <Check />
                  <div>
                    <div class="sust__itemTitle">{item.title}</div>
                    <div class="sust__itemDesc">{item.desc}</div>
                  </div>
                </li>
              )}
            </For>
          </ul>
          <div class="sust__badges">
            <span class="badge">
              <img src={truck} alt="" loading="lazy" />
              {t("sustainability.badgeDelivery")}
            </span>
            <span class="badge">
              <img src={warranty} alt="" loading="lazy" />
              {t("sustainability.badgeWarranty")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
