import { Component } from "solid-js";
import { Link } from "@solidjs/meta";
import mainImg from "~/components/static/png/MainImg.webp";
import shape from "~/components/static/png/shape.webp";
import waterDrop from "~/components/static/png/waterDrop.webp";
import whiteScissors from "~/components/static/png/whiteScissors.webp";

import { BsShieldCheck } from "solid-icons/bs";
import "./Hero.css";

const Hero: Component = () => (
  <>
    <Link rel="preload" as="image" href={mainImg} fetchpriority="high" />
    <section class="hero" style={{ "--hero-bg": `url(${mainImg})` }}>
      <div class="hero__inner">
        <p class="hero__eyebrow">
          <img alt="Kształt dekoracyjny" src={shape} width={24} height={24} />
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
            <img alt="Kropla wody" src={waterDrop} width={24} height={24} />
            oszczędność wody
          </li>
          <li>
            <BsShieldCheck />
            Odporna na UV, bezpieczna dla zwierząt
          </li>
          <li>
            <img alt="Nożyczki" src={whiteScissors} width={24} height={24} />
            Nie wymaga pielęgnacji
          </li>
        </ul>
      </div>
    </section>
  </>
);

export default Hero;
