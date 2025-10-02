import { Component, For } from "solid-js";
import "./Category.css";
// obrazy
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

const chips = [
  "Trawy krajobrazowe",
  "Trawy ogrodowe",
  "Trawy sportowe",
  "Akcesoria",
  "Place zabaw",
  "Trawy – bez montażu",
  "Trawy uniwersalne",
];

const Categories: Component = () => {
  return (
    <section class="cats">
      <div class="cats__head">
        <h2>Odkryj nasze kategorie</h2>
        <p class="cats__lead">
          Wybierz typ trawy dopasowany do przestrzeni: ogród, krajobraz, sport,
          lub dobierz akcesoria do montażu.
        </p>

        {/* pigułki BEZ onClick – zwykłe divy */}
        <div class="cats__chips" aria-label="Kategorie informacji">
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
                <h3 class="catCard__title">{c.title}</h3>
                <p class="catCard__desc">{c.desc}</p>
                <span class="catCard__cta">
                  Zobacz produkty <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          )}
        </For>
      </div>
    </section>
  );
};

export default Categories;
