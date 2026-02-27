import { Component } from "solid-js";
import lawnImg from "~/components/static/png/NaturalInspiredLawn.jpg";
import "./Sustainability.css";
import truck from "~/components/static/png/truck.webp";
import warranty from "~/components/static/png/warranty.webp";

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#16a34a" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const Sustainability: Component = () => {
  return (
    <section class="sust">
      <div class="sust__inner">
        <div class="sust__media">
          <img class="sust__img" src={lawnImg} alt="Sztuczna trawa inspirowana naturą" loading="lazy" />
        </div>
        <div class="sust__content">
          <h2 class="sust__title">Produkt przyjazny środowisku</h2>
          <p class="sust__lead">
            Nasza trawa ogranicza zużycie wody i spływ chemikaliów, pozostając
            miękka i bezpieczna dla dzieci oraz zwierząt.
          </p>
          <ul class="sust__list">
            <li class="sust__item">
              <Check />
              <div>
                <div class="sust__itemTitle">Brak toksycznych materiałów</div>
                <div class="sust__itemDesc">
                  produkt spełnia rygorystyczne normy bezpieczeństwa dla
                  przestrzeni mieszkalnych i komercyjnych
                </div>
              </div>
            </li>
            <li class="sust__item">
              <Check />
              <div>
                <div class="sust__itemTitle">Oszczędność wody</div>
                <div class="sust__itemDesc">
                  produkt nie wymaga podlewania, a jego specjalny drenaż
                  odprowadza wodę do ziemi bez zostawiania kałuży i efektu
                  „mokrej wykładziny”
                </div>
              </div>
            </li>
            <li class="sust__item">
              <Check />
              <div>
                <div class="sust__itemTitle">Produkt podlega recyklingowi</div>
                <div class="sust__itemDesc">
                  podłoże w większości produktów nadaje się do recyklingu, przez
                  co utylizacja trawnika nie wpływa negatywnie na środowisko
                </div>
              </div>
            </li>
          </ul>
          <div class="sust__badges">
            <span class="badge">
              <img src={truck} alt="" loading="lazy" />
              Szybka dostawa
            </span>
            <span class="badge">
              <img src={warranty} alt="" loading="lazy" />
              Gwarancja do 12 lat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
