import { Component } from "solid-js";
import "./Why.css";

const Why: Component = () => {
  return (
    <section class="why">
      <div class="why__inner">
        <header class="why__head">
          <h2>Dlaczego warto wybrać naszą trawę</h2>
          <p class="why__lead">
            Zaprojektowana dla realizmu i trwałości z wykorzystaniem
            ekologicznych materiałów i miękkiej, naturalnej faktury.
          </p>
        </header>

        <div class="why__grid">
          <article class="whyCard">
            <span class="whyCard__icon">{/* Leaf */}</span>
            <h3 class="whyCard__title">Ultrarealistyczne źdźbła</h3>
            <p class="whyCard__desc">
              Wielotonowe włókna i podszycie nadają naturalne zróżnicowanie
              kolorów i realistyczną teksturę.
            </p>
          </article>

          <article class="whyCard">
            <span class="whyCard__icon">{/* Drop */}</span>
            <h3 class="whyCard__title">Oszczędne gospodarowanie wodą</h3>
            <p class="whyCard__desc">
              Perforowane podłoże szybko odprowadza wodę i eliminuje błotniste
              plamy.
            </p>
          </article>

          <article class="whyCard">
            <span class="whyCard__icon">{/* Shield */}</span>
            <h3 class="whyCard__title">Stworzona, by przetrwać</h3>
            <p class="whyCard__desc">
              Odporne na UV włókna zachowują kolor i kształt nawet przy dużym
              obciążeniu.
            </p>
          </article>

          <article class="whyCard">
            <span class="whyCard__icon">{/* Scissors off */}</span>
            <h3 class="whyCard__title">Minimalna pielęgnacja</h3>
            <p class="whyCard__desc">
              Bez koszenia, podlewania czy nawożenia. Zawsze perfekcyjna.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Why;
