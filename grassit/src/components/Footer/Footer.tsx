import { Component } from "solid-js";
import { A } from "@solidjs/router";
import "./Footer.css";
import logo from "~/components/static/png/logo.png";

const IconFB = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 20v-7h2.6l.4-3H13V8.2c0-.9.3-1.5 1.7-1.5H16V4.1C15.7 4 14.7 4 13.6 4 11.3 4 9.7 5.4 9.7 7.9V10H7v3h2.7v7h3.3z"
    />
  </svg>
);
const IconIG = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
    />
  </svg>
);
const IconTW = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M21 6.5c-.6.3-1.3.5-2 .6.7-.5 1.2-1.1 1.4-2-.7.4-1.4.7-2.2.9a3.4 3.4 0 0 0-5.9 3.1A9.7 9.7 0 0 1 4 5.8a3.4 3.4 0 0 0 1 4.6c-.5 0-1-.2-1.4-.4v.1c0 1.6 1.1 3 2.7 3.3-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1a3.4 3.4 0 0 0 3.2 2.4A6.8 6.8 0 0 1 3 18a9.6 9.6 0 0 0 5.2 1.5c6.3 0 9.8-5.2 9.8-9.8V9c.7-.5 1.3-1.1 1.8-1.8z"
    />
  </svg>
);

const Footer: Component = () => {
  return (
    <footer class="ft">
      <div class="ft__inner">
        <div class="ft__col ft__brand">
          <A href="/" class="ft__logoLink" aria-label="Strona główna">
            <img src={logo} alt="" class="ft__logo" />
            <span class="sr-only">Grassit</span>
          </A>
          <p class="ft__tagline">
            Rozwiązanie idealne do domu, przestrzeni komercyjnych i obiektów
            sportowych.
          </p>

          <div class="ft__social" aria-label="Media społecznościowe">
            <A
              href="https://www.facebook.com/grassitpolska"
              aria-label="Facebook"
              class="ft__socialBtn"
            >
              <IconFB />
            </A>
            <A
              href="https://www.instagram.com/grassit.pl/"
              aria-label="Instagram"
              class="ft__socialBtn"
            >
              <IconIG />
            </A>
            <A href="#" aria-label="X / Twitter" class="ft__socialBtn">
              <IconTW />
            </A>
          </div>
        </div>

        <nav class="ft__col" aria-label="Produkty">
          <h3 class="ft__title">Produkty</h3>
          <ul class="ft__links">
            <li>
              <A href="/produkty?category=Trawy Dekoracyjne">
                Trawy Dekoracyjne
              </A>
            </li>
            <li>
              <A href="/produkty?category=Trawy ogrodowe">Trawy ogrodowe</A>
            </li>
            <li>
              <A href="/produkty?category=Trawy sportowe">Trawy sportowe</A>
            </li>
            <li>
              <A href="/produkty?category=Akcesoria">Akcesoria</A>
            </li>
          </ul>
        </nav>

        <nav class="ft__col" aria-label="Informacje">
          <h3 class="ft__title">Informacje</h3>
          <ul class="ft__links">
            <li>
              <A href="/dostawa">Dostawa</A>
            </li>
            <li>
              <A href="/realizacje">Realizacje</A>
            </li>
          </ul>
        </nav>

        <nav class="ft__col" aria-label="Usługi">
          <h3 class="ft__title">Usługi</h3>
          <ul class="ft__links">
            <li>
              <A href="/montaz">Montaż</A>
            </li>
            <li>
              <A href="/doradztwo">Doradztwo</A>
            </li>
          </ul>
        </nav>

        <address class="ft__col ft__contact" aria-label="Kontakt">
          <h3 class="ft__title">Kontakt</h3>
          <p> Kazimierza Wielkiego 47 A</p>
          <p>32-400 Myślenice, Polska</p>
          <p>REGON: 522476299</p>
          <p> NIP: 6812093897</p>
          <p>+48 515 401 178</p>
          <p>
            <a href="mailto:biuro@grassit.pl">biuro@grassit.pl</a>
          </p>
        </address>
      </div>

      <div class="ft__bottom__wrapper">
        <div class="ft__bottom">
          <div class="ft__bottomInner">
            <p>
              © {new Date().getFullYear()} Grassit. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;