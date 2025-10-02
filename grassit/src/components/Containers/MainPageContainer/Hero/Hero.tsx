import { Component } from "solid-js";
import mainImg from "~/components/static/png/MainImg.png";
import "./Hero.css";

const Hero: Component = () => {
  return (
    <header class="hero" style={{ "--hero-bg": `url(${mainImg})` }}>
      <div class="hero__inner">
        <p class="hero__eyebrow">Ekologiczna, ultrarealistyczna trawa</p>

        <h1 class="hero__title">
          Zawsze zielona, zero
          <br /> pielęgnacji
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
          <li>Oszczędzasz aż do 80% wody</li>
          <li>Odporna na UV, bezpieczna dla zwierząt</li>
          <li>Nie wymaga pielęgnacji</li>
        </ul>
      </div>
    </header>
  );
};

export default Hero;
