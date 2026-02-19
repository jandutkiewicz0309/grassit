import { Component } from "solid-js";
import mainImg from "~/components/static/png/MainImg.jpg";
import shape from "~/components/static/png/shape.png";
import waterDrop from "~/components/static/png/waterDrop.png";
import whiteScissors from "~/components/static/png/whiteScissors.png";

import { BsShieldCheck } from "solid-icons/bs";
import "./Hero.css";

const Hero: Component = () => (
  <section class="hero" style={{ "--hero-bg": `url(${mainImg})` }}>
    <div class="hero__inner">
      <p class="hero__eyebrow">
        <img alt="Kształt dekoracyjny" src={shape} />
        Produkt ekologiczny
      </p>

      <h1 class="hero__title">
        Zielony trawnik
        <br /> przez cały rok
      </h1>

      <p class="hero__lead">
        Odmień swoją przestrzeń dzięki najwyższej jakości trawie syntetycznej.
        Idealna do stadionów, ogrodów, przestrzeni komercyjnych i publicznych.
        Profesjonalny montaż, trwałość na lata.
      </p>

      <div class="hero__actions">
        <a href="/kontakt" class="btn btn--primary">
          Skontaktuj się
        </a>

        <a href="/produkty" class="btn btn--ghost">
          Zobacz produkty
        </a>
      </div>

      <ul class="hero__usps" aria-label="Korzyści">
        <li>
          <img alt="Kropla wody" src={waterDrop} />
          oszczędność wody
        </li>
        <li>
          <BsShieldCheck />
          Odporna na UV, bezpieczna dla zwierząt
        </li>
        <li>
          <img alt="Nożyczki" src={whiteScissors} />
          Nie wymaga pielęgnacji
        </li>
      </ul>
    </div>
  </section>
);

export default Hero;
