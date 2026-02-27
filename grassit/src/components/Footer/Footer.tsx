import { Component } from "solid-js";
import { A } from "@solidjs/router";
import "./Footer.css";
import logo from "~/components/static/png/logo.webp";

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


const Footer: Component = () => {
  return (
    <footer class="ft">
      <div class="ft__inner">
        <div class="ft__col ft__brand">
          <A href="/" class="ft__logoLink" aria-label="Strona główna">
            <img src={logo} alt="Grassit" class="ft__logo" width="61" height="40" />
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
         
          </div>
        </div>

        <nav class="ft__col" aria-label="Produkty">
          <p class="ft__title">Produkty</p>
          <ul class="ft__links">
            <li>
              <A href="/produkty?category=Trawy Dekoracyjne">
                Trawy Dekoracyjne
              </A>
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
          <p class="ft__title">Informacje</p>
          <ul class="ft__links">
            <li>
              <A href="/o-nas">O nas</A>
            </li>
            <li>
              <A href="/dostawa">Dostawa</A>
            </li>
            <li>
              <A href="/realizacje">Realizacje</A>
            </li>
          </ul>
        </nav>

        <nav class="ft__col" aria-label="Usługi">
          <p class="ft__title">Usługi</p>
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
          <p class="ft__title">Kontakt</p>
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