import { Component, For } from "solid-js";
import "./Category.css";
import imgKrajobraz from "~/components/static/png/TrawyKrajobrazowe.png";
import imgOgrodowe from "~/components/static/png/trawyOgrodoweImg.png";
import imgSportowe from "~/components/static/png/trawySportoweImg.png";
import imgAkcesoria from "~/components/static/png/akcesoraImg.png";

type Card = {
  title: string;
  desc: string;
  href: string;
  img: string;
  span?: number;
};

const cards: Card[] = [
  {
    title: "Trawy krajobrazowe",
    desc: "Gęste, dekoracyjne trawniki dla dużych przestrzeni zewnętrznych",
    href: "/produkty?cat=krajobrazowe",
    img: imgKrajobraz,
    span: 8,
  },
  {
    title: "Trawy ogrodowe",
    desc: "Naturalny wygląd i komfort użytkowania w domowym ogrodzie",
    href: "/produkty?cat=ogrodowe",
    img: imgOgrodowe,
    span: 4,
  },
  {
    title: "Trawy sportowe",
    desc: "Wytrzymałe nawierzchnie do piłki nożnej, tenisa i golfa.",
    href: "/produkty?cat=sportowe",
    img: imgSportowe,
    span: 6,
  },
  {
    title: "Akcesoria",
    desc: "Narzędzia montażowe, kije, łączniki i szczotki.",
    href: "/produkty?cat=akcesoria",
    img: imgAkcesoria,
    span: 6,
  },
];

const chips = ["Place zabaw", "Trawy – bez montażu", "Trawy uniwersalne"];
const exclusiveChips = [
  "Trawy krajobrazowe",
  "Trawy ogrodowe",
  "Trawy sportowe",
  "Akcesoria",
];

const Categories: Component = () => {
  return (
    <section class="cats">
      <div class="cats__head">
        <div class="cats__info">
          <h2>Odkryj nasze kategorie</h2>
          <p class="cats__lead">
            Wybierz typ trawy dopasowany do przestrzeni: ogród, krajobraz,
            sport, lub dobierz akcesoria do montażu.
          </p>
        </div>
        <div class="cats__chips" aria-label="Kategorie informacji">
          <For each={exclusiveChips}>
            {(label) => <div class="exclusive_chip">{label}</div>}
          </For>
          <For each={chips}>{(label) => <div class="chip">{label}</div>}</For>
        </div>
      </div>
      <div class="cats__grid">
        <For each={cards}>
          {(c) => (
            <a
              class="catCard"
              href={c.href}
              style={{ "grid-column": `span ${c.span ?? 6}` }}
              aria-label={`${c.title} – ${c.desc}. Zobacz produkty.`}
            >
              <img class="catCard__img" src={c.img} alt="" loading="lazy" />
              <div class="catCard__overlay">
                <div class="card__content">
                  <h3 class="catCard__title">{c.title}</h3>
                  <p class="catCard__desc">{c.desc}</p>
                  <span class="catCard__cta">
                    Zobacz produkty
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
            </a>
          )}
        </For>
      </div>
    </section>
  );
};

export default Categories;
