import { Component, For } from "solid-js";
import { A } from "@solidjs/router";
import "./Category.css";
import imgKrajobraz from "~/components/static/png/TrawyKrajobrazowe.jpg";
import imgSportowe from "~/components/static/png/trawySportoweImg.webp";
import imgAkcesoria from "~/components/static/png/akcesoraImg.webp";

type Card = {
  title: string;
  desc: string;
  href: string;
  img: string;
  w: number;
  h: number;
  span?: number;
};

const cards: Card[] = [
  {
    title: "Trawy Dekoracyjne",
    desc: "Gęste, dekoracyjne trawniki  dla twojego ogrodu i innych powierzchni zewnętrznych",
    href: "/produkty?category=Trawy Dekoracyjne",
    img: imgKrajobraz,
    w: 4096,
    h: 2731,
    span: 12,
  },
  {
    title: "Trawy sportowe",
    desc: "Najwyższej jakości murawy sportowe do tenisa, piłki nożnej i padla.",
    href: "/produkty?category=Trawy sportowe",
    img: imgSportowe,
    w: 440,
    h: 352,
    span: 6,
  },
  {
    title: "Akcesoria",
    desc: " Narzędzia montażowe i inne.",
    href: "/produkty?category=Akcesoria",
    img: imgAkcesoria,
    w: 816,
    h: 350,
    span: 6,
  },
];

const Categories: Component = () => {
  return (
    <section class="cats">
      <div class="cats__head">
        <div class="cats__info">
          <h2>Wybierz odpowiedni rodzaj trawy do swoich potrzeb</h2>
          <p class="cats__lead">
            Wybierz typ trawy dopasowany do przestrzeni: ogród, krajobraz,
            sport, lub dobierz akcesoria do montażu.
          </p>
        </div>
      </div>
      <div class="cats__grid">
        <For each={cards}>
          {(c) => (
            <A
              class="catCard"
              href={c.href}
              style={{ "grid-column": `span ${c.span ?? 6}` }}
              aria-label={`${c.title} – ${c.desc}. Zobacz produkty.`}
            >
              <img class="catCard__img" src={c.img} alt="" loading="lazy" width={c.w} height={c.h} />
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
            </A>
          )}
        </For>
      </div>
    </section>
  );
};

export default Categories;
