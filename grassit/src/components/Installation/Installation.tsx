import { Component } from "solid-js";
import "./Installation.css";
import instalationImg from "~/components/static/png/instalationImg.jpg";

export const InstallationPage: Component = () => {
  return (
    <section class="montaz">
      <div class="montaz__grid">
        <div class="montaz__media">
          <img src={instalationImg} alt="Dostawa sztucznej trawy" loading="lazy" />
        </div>

        <div class="montaz__content">
          <h1 class="montaz__title">Montaż trawy syntetycznej</h1>

          <p class="montaz__lead">
            Zajmujemy się kompleksowym montażem i sprzedażą sztucznej trawy na
            terenie całej Polski. Realizujemy projekty zarówno dla klientów
            indywidualnych, jak i firm, od małych ogrodów, przez tarasy, po
            rozległe tereny rekreacyjne i komercyjne. W zależności od
            zastosowania oferujemy trawy o różnej wysokości włókna, gęstości i
            sprężystości, dobrane tak, by zachować idealny wygląd i trwałość
            przez wiele lat.
          </p>

          <p class="montaz__intro">W ramach usługi zapewniamy:</p>
          <ul class="montaz__list">
            <li>przygotowanie i wyrównanie podłoża,</li>
            <li>dostawę trawy oraz materiałów montażowych,</li>
            <li>wykonanie niezbędnych docięć i łączeń,</li>
            <li>wypełnienie piaskiem kwarcowym (jeśli wymagane),</li>
            <li>uporządkowanie terenu po zakończeniu prac.</li>
          </ul>

          <p class="montaz__note">
            Cena usługi zależy od wielkości projektu, stopnia skomplikowania,
            rodzaju podłoża oraz użytych materiałów. Wszystkie wyceny
            przygotowujemy indywidualnie.
          </p>

          <a href="/kontakt" class="montaz__cta">
            Skontaktuj się
          </a>
        </div>
      </div>
    </section>
  );
};
