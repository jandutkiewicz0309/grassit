import { Component } from "solid-js";
import lawnImg from "~/components/static/png/NaturalInspiredLawn.png";
import "./Sustainability.css";

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#16a34a" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const Shield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z"
    />
  </svg>
);

const Truck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17 8V4H1v11h2a3 3 0 1 0 6 0h6a3 3 0 1 0 6 0h2v-5h-3l-3-3h-2Z"
    />
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
              <Truck /> Szybka dostawa
            </span>
            <span class="badge">
              <Shield /> Gwarancja 10–15 lat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
