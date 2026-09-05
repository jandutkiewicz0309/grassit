import { Component, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import "./Category.css";
import imgKrajobraz from "~/components/static/png/TrawyKrajobrazowe.jpg";
import imgSportowe from "~/components/static/png/trawySportoweImg.jpg";
import imgAkcesoria from "~/components/static/png/akcesoraImg.png";
import type { CategoryType } from "~/data/products";
import { path, t } from "~/utils/translations";

type Card = {
  title: string;
  desc: string;
  category: CategoryType;
  img: string;
  span?: number;
};

const Categories: Component = () => {
  /**
   * Built inside the component so it re-runs on a language change - a
   * module-scope array would be frozen at import time.
   */
  const cards = createMemo<Card[]>(() => [
    {
      title: t("categories.decorativeTitle"),
      desc: t("categories.decorativeDesc"),
      category: "trawy_dekoracyjne",
      img: imgKrajobraz,
      span: 12,
    },
    {
      title: t("categories.sportTitle"),
      desc: t("categories.sportDesc"),
      category: "trawy_sportowe",
      img: imgSportowe,
      span: 6,
    },
    {
      title: t("categories.accessoriesTitle"),
      desc: t("categories.accessoriesDesc"),
      category: "akcesoria",
      img: imgAkcesoria,
      span: 6,
    },
  ]);

  return (
    <section class="cats">
      <div class="cats__head">
        <div class="cats__info">
          <h2>{t("categories.heading")}</h2>
          <p class="cats__lead">{t("categories.lead")}</p>
        </div>
      </div>
      <div class="cats__grid">
        <For each={cards()}>
          {(c) => (
            <A
              class="catCard"
              /* The technical slug travels in the URL, not the visible label. */
              href={`${path("products")}?category=${c.category}`}
              style={{ "grid-column": `span ${c.span ?? 6}` }}
              aria-label={t("categories.cardAria", { title: c.title, desc: c.desc })}
            >
              <img class="catCard__img" src={c.img} alt="" loading="lazy" />
              <div class="catCard__overlay">
                <div class="card__content">
                  <h3 class="catCard__title">{c.title}</h3>
                  <p class="catCard__desc">{c.desc}</p>
                  <span class="catCard__cta">
                    {t("common.seeProducts")}
                    <span aria-hidden="true" class="arrow">
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M869 487.8 491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </A>
          )}
        </For>
      </div>
    </section>
  );
};

export default Categories;
