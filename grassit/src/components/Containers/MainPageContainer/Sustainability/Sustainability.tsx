import { Component } from "solid-js";
import lawnImg from "~/components/static/png/NaturalInspiredLawn.jpg";
import "./Sustainability.css";
import truck from "~/components/static/png/truck.png";
import warranty from "~/components/static/png/warranty.png";

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
          <img class="sust__img" src={lawnImg} alt="" loading="lazy" />
        </div>
        <div class="sust__content">
          <h2 class="sust__title">Zrównoważona z natury</h2>
          <p class="sust__lead">
            Nasza trawa ogranicza zużycie wody i spływ chemikaliów, pozostając
            miękka i bezpieczna dla dzieci oraz zwierząt.
          </p>
          <ul class="sust__list">
            <li class="sust__item">
              <Check />
              <div>
                <div class="sust__itemTitle">Materiały bez ołowiu i toksyn</div>
                <div class="sust__itemDesc">
                  Spełnia rygorystyczne normy bezpieczeństwa dla przestrzeni
                  mieszkalnych i komercyjnych.
                </div>
              </div>
            </li>
            <li class="sust__item">
              <Check />
              <div>
                <div class="sust__itemTitle">Oszczędność wody do 80%</div>
                <div class="sust__itemDesc">
                  Inteligentny drenaż, bez potrzeby nawadniania.
                </div>
              </div>
            </li>
            <li class="sust__item">
              <Check />
              <div>
                <div class="sust__itemTitle">Opcje podłoża do recyklingu</div>
                <div class="sust__itemDesc">
                  Wybierz produkty z podłożem zaprojektowanym z myślą o odzysku
                  po zakończeniu użytkowania.
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
              Gwarancja 10–15 lat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
