import { Component } from "solid-js";
import "./Consulting.css";
import doradztwoImg from "~/components/static/png/consulting.webp";

export const ConsultingPage: Component = () => {
  return (
    <section class="doradztwo">
      <div class="doradztwo__grid">
        <div class="doradztwo__media">
          <img src={doradztwoImg} alt="Doradztwo przy wyborze trawy" loading="lazy" />
        </div>

        <div class="doradztwo__content">
          <h1 class="doradztwo__title">Doradztwo</h1>

          <p class="doradztwo__lead">
            Dobór odpowiedniej sztucznej trawy wymaga uwzględnienia kilku
            czynników — rodzaju powierzchni, intensywności użytkowania i
            oczekiwanego efektu wizualnego. Oferujemy profesjonalne doradztwo
            techniczne i estetyczne, dzięki któremu otrzymasz rozwiązanie
            idealnie dopasowane do Twojego projektu.
          </p>

          <p class="doradztwo__subtitle">W czym pomagamy:</p>
          <ul class="doradztwo__list">
            <li>
              dobór trawy o właściwej strukturze, kolorze i wysokości włókna,
            </li>
            <li>ocena warunków technicznych podłoża,</li>
            <li>określenie potrzeb w zakresie podbudowy i drenażu,</li>
            <li>kalkulacja ilości materiału i kosztów montażu.</li>
          </ul>

          <p class="doradztwo__subtitle">Jak wygląda doradztwo:</p>
          <p class="doradztwo__text">
            Po krótkiej rozmowie lub wymianie wiadomości analizujemy Twoje
            potrzeby i warunki techniczne terenu. Na tej podstawie proponujemy
            konkretne modele trawy, sposób montażu oraz orientacyjny koszt.
          </p>

          <a href="/kontakt" class="doradztwo__cta">
            Skontaktuj się
          </a>
        </div>
      </div>
    </section>
  );
};
