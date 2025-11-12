import { Component } from "solid-js";
import "./Delivery.css";
import instalationImg from "~/components/static/png/instalationImg.png";

export const DeliveryPage: Component = () => {
  return (
    <section class="dostawa">
      <div class="dostawa__grid">
        <div class="dostawa__media">
          <img src={instalationImg} alt="Dostawa sztucznej trawy" />
        </div>

        <div class="dostawa__content">
          <h1 class="dostawa__title">Dostawa</h1>

          <p class="dostawa__lead">
            Zapewniamy szybki i bezpieczny transport sztucznej trawy na terenie
            całego kraju. Każda rolka jest odpowiednio zabezpieczana, aby
            dotarła do klienta w nienaruszonym stanie, niezależnie od
            odległości.
          </p>

          <p class="dostawa__subtitle">Jak przebiega dostawa:</p>
          <ol class="dostawa__list dostawa__list--ol">
            <li>
              <strong>Zamówienie i potwierdzenie terminu</strong> — ustalamy
              rodzaj trawy, metraż i adres dostawy.
            </li>
            <li>
              <strong>Przygotowanie materiału</strong> — trawa jest przycinana i
              zwijana w rolki o dogodnej długości.
            </li>
            <li>
              <strong>Transport i dostarczenie</strong> — realizujemy przewóz
              własnym transportem lub zaufanymi firmami kurierskimi.
            </li>
          </ol>

          <p class="dostawa__text">
            Dostarczamy trawę zarówno w ramach kompleksowych realizacji
            montażowych, jak i przy samodzielnych zakupach.
          </p>

          <a href="/kontakt" class="dostawa__cta">
            Skontaktuj się
          </a>
        </div>
      </div>
    </section>
  );
};
